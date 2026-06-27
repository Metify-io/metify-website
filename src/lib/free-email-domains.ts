/**
 * Domains belonging to free / personal email providers.
 * Submissions from these domains are blocked on all lead-capture forms.
 */
const FREE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  // Google
  'gmail.com',
  'googlemail.com',

  // Microsoft
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',

  // Yahoo
  'yahoo.com',
  'ymail.com',
  'rocketmail.com',

  // Apple
  'icloud.com',
  'me.com',
  'mac.com',

  // AOL / Verizon
  'aol.com',

  // ProtonMail
  'protonmail.com',
  'proton.me',
  'pm.me',

  // Zoho free tier
  'zohomail.com',

  // Other popular free providers
  'mail.com',
  'gmx.com',
  'gmx.net',
  'yandex.com',
  'tutanota.com',
  'tuta.com',
  'fastmail.com',
  'hushmail.com',
  'inbox.com',
  'mail.ru',
]);

export const FREE_EMAIL_BLOCK_MESSAGE =
  'Please use your work email address. Free email providers (Gmail, Outlook, Yahoo, etc.) are not accepted.';

/** Returns `true` when the email belongs to a blocked free-email domain. */
export function isFreeEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@').pop() ?? '';
  return FREE_EMAIL_DOMAINS.has(domain);
}
