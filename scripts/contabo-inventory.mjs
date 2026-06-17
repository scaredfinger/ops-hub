#!/usr/bin/env node

import { randomUUID } from 'node:crypto';

const AUTH_URL = 'https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token';
const API_BASE_URL = 'https://api.contabo.com/v1';
const PAGE_SIZE = 100;

const REQUIRED_ENV_VARS = [
  'CONTABO_CLIENT_ID',
  'CONTABO_CLIENT_SECRET',
  'CONTABO_API_USER',
  'CONTABO_API_PASSWORD',
];

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPrimaryIp(ipConfig, version) {
  return ipConfig?.[version]?.ip ?? null;
}

function summarizeInstance(instance) {
  return {
    instanceId: instance.instanceId,
    name: instance.name,
    displayName: instance.displayName,
    region: instance.region,
    dataCenter: instance.dataCenter,
    status: instance.status,
    productId: instance.productId,
    productName: instance.productName,
    osType: instance.osType,
    ipv4: getPrimaryIp(instance.ipConfig, 'v4'),
    ipv6: getPrimaryIp(instance.ipConfig, 'v6'),
    createdDate: instance.createdDate ?? null,
  };
}

async function parseErrorResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/json')) {
      const body = await response.json();
      return JSON.stringify(body);
    }

    const text = await response.text();
    return text || response.statusText;
  } catch {
    return response.statusText;
  }
}

async function getAccessToken() {
  const body = new URLSearchParams({
    client_id: getRequiredEnv('CONTABO_CLIENT_ID'),
    client_secret: getRequiredEnv('CONTABO_CLIENT_SECRET'),
    username: getRequiredEnv('CONTABO_API_USER'),
    password: getRequiredEnv('CONTABO_API_PASSWORD'),
    grant_type: 'password',
  });

  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const details = await parseErrorResponse(response);
    throw new Error(`Contabo authentication failed (${response.status}): ${details}`);
  }

  const payload = await response.json();
  if (!payload.access_token) {
    throw new Error('Contabo authentication response did not include an access token');
  }

  return payload.access_token;
}

async function contaboGet(path, accessToken, query = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-request-id': randomUUID(),
      'x-trace-id': 'opencode-contabo-inventory',
    },
  });

  if (!response.ok) {
    const details = await parseErrorResponse(response);
    throw new Error(`Contabo API request failed for ${path} (${response.status}): ${details}`);
  }

  return response.json();
}

async function listAllInstances(accessToken) {
  const instances = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await contaboGet('/compute/instances', accessToken, {
      page,
      size: PAGE_SIZE,
    });

    instances.push(...(response.data ?? []));
    totalPages = response._pagination?.totalPages ?? 1;
    page += 1;
  }

  return instances;
}

async function main() {
  for (const name of REQUIRED_ENV_VARS) {
    getRequiredEnv(name);
  }

  const accessToken = await getAccessToken();
  const instances = await listAllInstances(accessToken);
  const summary = instances.map(summarizeInstance);

  const output = {
    provider: 'contabo',
    resourceType: 'instance',
    status: 'ok',
    fetchedAt: new Date().toISOString(),
    totalInstances: summary.length,
    instances: summary,
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  const output = {
    provider: 'contabo',
    resourceType: 'instance',
    status: 'error',
    fetchedAt: new Date().toISOString(),
    error: error.message,
  };

  console.error(JSON.stringify(output, null, 2));
  process.exitCode = 1;
});
