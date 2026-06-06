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
 * The endpoint sends `Access-Control-Allow-Origin: *`, so we make a normal CORS
 * request and read the JSON response ({ success, errors }) — real success/error
 * handling, no optimistic guessing.
 *
 * If you later want per-request bot checks (Turnstile) or server-side
 * validation, swap the body of `subscribe()` to call a Cloudflare Worker /
 * Pages Function instead — nothing else in the app needs to change.
 */

interface MailerLiteResponse {
  success?: boolean;
  errors?: { fields?: { email?: string[] } };
}

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
    const res = await fetch(endpoint, { method: "POST", body });
    const data = (await res.json().catch(() => null)) as MailerLiteResponse | null;

    if (data?.success) {
      return { status: "ok" };
    }
    if (data?.errors?.fields?.email) {
      return { status: "invalid_email" };
    }
    return { status: "error", message: JSON.stringify(data) };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : undefined,
    };
  }
}
