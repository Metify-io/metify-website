export const prerender = false;

import type { APIRoute } from 'astro';
import { isFreeEmail, FREE_EMAIL_BLOCK_MESSAGE } from '../../lib/free-email-domains';

const HUBSPOT_PORTAL_ID = '7609233';
const HUBSPOT_CONTACT_FORM_ID = 'ba3c459f-c582-4f1f-b761-9a82da34ba18';
const MAX_FIELD_LENGTH = 500;

function sanitizeString(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = raw as Record<string, unknown>;
  const firstname = sanitizeString(body.firstname);
  const lastname = sanitizeString(body.lastname);
  const email = sanitizeString(body.email);
  const message = sanitizeString(body.message);

  if (!email || !firstname || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (isFreeEmail(email)) {
    return new Response(
      JSON.stringify({ error: FREE_EMAIL_BLOCK_MESSAGE, details: { email: [FREE_EMAIL_BLOCK_MESSAGE] } }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const pageUri = request.headers.get('referer') ?? 'https://metify.ai/contact';

  try {
    const resp = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_CONTACT_FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: firstname },
            { name: 'lastname', value: lastname },
            { name: 'email', value: email },
            { name: 'phone', value: sanitizeString(body.phone) },
            { name: 'company', value: sanitizeString(body.company) },
            { name: 'message', value: message },
          ],
          context: {
            pageUri,
            pageName: 'Contact Us',
          },
        }),
      },
    );

    if (!resp.ok) {
      const details = await resp.text().catch(() => '');
      console.error('HubSpot contact submission failed', resp.status, details);
      return new Response(JSON.stringify({ error: 'Submission failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to submit form' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
