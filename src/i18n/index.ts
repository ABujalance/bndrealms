import { en } from "./en";
import { es } from "./es";
import type { Locale, Strings } from "./types";

export type { Locale, Strings };

/** Registry of available locales. Add new languages here. */
export const locales: Record<Locale, Strings> = { en, es };

/** The active locale for the page. Bump this (or wire it to navigator.language /
 *  a query param) when you want to ship another language. Kept deliberately simple
 *  — this is a preliminary i18n layer, no runtime switcher yet. */
export const DEFAULT_LOCALE: Locale = "en";

/** Returns the strings for a locale, falling back to the default. */
export function getStrings(locale: Locale = DEFAULT_LOCALE): Strings {
  return locales[locale] ?? locales[DEFAULT_LOCALE];
}
