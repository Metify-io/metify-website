export const prerender = false;

import type { APIRoute } from 'astro';
import { isFreeEmail, FREE_EMAIL_BLOCK_MESSAGE } from '../../lib/free-email-domains';

const LICENSE_SERVER_URL = 'https://licenses.metify.io/l/api/v1/webform/';
const HUBSPOT_PORTAL_ID = '7609233';
const HUBSPOT_TRIAL_FORM_ID = '647d55a9-20bd-4978-a833-f5b1f9061843';
const PRODUCT = 'mojo-platform';
const PRODUCT_VERSION = '3';

type TrialLead = {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  jobtitle: string;
  pageUri: string;
};

const submitTrialLeadToHubSpot = async (lead: TrialLead) => {
  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_TRIAL_FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: lead.firstname },
            { name: 'lastname', value: lead.lastname },
            { name: 'email', value: lead.email },
            { name: 'company', value: lead.company },
            { name: 'jobtitle', value: lead.jobtitle },
          ],
          context: {
            pageUri: lead.pageUri,
            pageName: 'Download Free Trial',
          },
        }),
      },
    );

    if (!response.ok) {
      const details = await response.text().catch(() => '');
      console.error('HubSpot trial submission failed', response.status, details);
    }
  } catch (error) {
    console.error('HubSpot trial submission error', error);
  }
};

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

  if (isFreeEmail(email)) {
    return new Response(
      JSON.stringify({ error: FREE_EMAIL_BLOCK_MESSAGE, details: { email: [FREE_EMAIL_BLOCK_MESSAGE] } }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const name = [firstname, lastname].filter(Boolean).join(' ');
  const pageUri = request.headers.get('referer') ?? 'https://metify.ai/trial';

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

    await submitTrialLeadToHubSpot({
      firstname,
      lastname,
      email,
      company,
      jobtitle,
      pageUri,
    });

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
