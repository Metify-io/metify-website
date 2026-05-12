export const prerender = false;

import type { APIRoute } from 'astro';

const LICENSE_SERVER_URL = 'https://licenses.metify.io/l/api/v1/webform/';
const PRODUCT = 'mojo-platform';
const PRODUCT_VERSION = '3';

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.LICENSE_SERVER_API_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { firstname, lastname, email, company, jobtitle } = body;
  if (!email || !firstname) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = [firstname, lastname].filter(Boolean).join(' ');

  try {
    const resp = await fetch(LICENSE_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        product: PRODUCT,
        product_version: PRODUCT_VERSION,
      }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => null);
      return new Response(JSON.stringify({ error: 'License server error', details: data }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to reach license server' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
