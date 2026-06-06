import { siteConfig } from "../config/site.config";

/**
 * MailerLite signup — kept deliberately isolated so the rest of the app never
 * knows *how* subscription happens.
 *
 * We POST straight to MailerLite's public embedded-form endpoint (no API token,
 * so nothing secret ships to the browser — perfect for a static GitHub Pages
 * site). MailerLite then sends the double opt-in confirmation email, which is
 * the real signup gate and our bot defense.
 *
 * Because that endpoint doesn't send CORS headers, we use `mode: "no-cors"`:
 * the request still reaches MailerLite, but the response is opaque (unreadable).
 * So a non-throwing request is treated as "submitted" and we rely on the
 * confirmation email for actual verification.
 *
 * If you later want a readable JSON response, per-request bot checks (Turnstile),
 * or server-side validation, swap the body of `subscribe()` to call a Cloudflare
 * Worker / Pages Function instead — nothing else in the app needs to change.
 */

export type SubscribeResult =
  | { status: "ok" }
  | { status: "invalid_email" }
  | { status: "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export async function subscribe(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) {
    return { status: "invalid_email" };
  }

  const { accountId, formId } = siteConfig.mailerLite;
  if (!accountId || !formId) {
    return {
      status: "error",
      message:
        "MailerLite is not configured. Set mailerLite.accountId and .formId in src/config/site.config.ts.",
    };
  }

  const endpoint = `https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe`;

  const body = new FormData();
  body.append("fields[email]", trimmed);
  body.append("ml-submit", "1");
  body.append("anticsrf", "true");

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      body,
    });
    // Opaque response — assume submitted; double opt-in does the real work.
    return { status: "ok" };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : undefined,
    };
  }
}
