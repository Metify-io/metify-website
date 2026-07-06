export const prerender = false;

import type { APIRoute } from 'astro';
import { isFreeEmail, FREE_EMAIL_BLOCK_MESSAGE } from '../../lib/free-email-domains';

const HUBSPOT_PORTAL_ID = '7609233';
const HUBSPOT_CONTACT_FORM_ID = 'ba3c459f-c582-4f1f-b761-9a82da34ba18';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactLead = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  pageUri: string;
};

const submitContactLeadToHubSpot = async (lead: ContactLead) => {
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_CONTACT_FORM_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: lead.firstname },
          { name: 'lastname', value: lead.lastname },
          { name: 'email', value: lead.email },
          { name: 'phone', value: lead.phone },
          { name: 'company', value: lead.company },
          { name: 'message', value: lead.message },
        ],
        context: {
          pageUri: lead.pageUri,
          pageName: 'Contact Us',
        },
      }),
    },
  );

  return response;
};

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const firstname = (body.firstname ?? '').trim();
  const lastname = (body.lastname ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const company = (body.company ?? '').trim();
  const message = (body.message ?? '').trim();

  // Honeypot: bots fill hidden fields that humans never see.
  if ((body.website ?? '').trim() !== '') {
    // Pretend success so bots get no signal.
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!firstname || !lastname || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Please enter a valid email address.' }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (isFreeEmail(email)) {
    return new Response(
      JSON.stringify({ error: FREE_EMAIL_BLOCK_MESSAGE }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const pageUri = request.headers.get('referer') ?? 'https://www.metify.ai/contact';

  try {
    const resp = await submitContactLeadToHubSpot({
      firstname,
      lastname,
      email,
      phone,
      company,
      message,
      pageUri,
    });

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
  } catch (error) {
    console.error('HubSpot contact submission error', error);
    return new Response(JSON.stringify({ error: 'Failed to reach HubSpot' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
