/** Shape every locale must implement. Add keys here and TS will flag any locale
 *  that's missing the translation. */
export interface Strings {
  hero: {
    title: string;
    subtitle: string;
  };
  form: {
    emailPlaceholder: string;
    emailLabel: string;
    submit: string;
    submitting: string;
    success: string;
    invalidEmail: string;
    error: string;
  };
  footer: {
    etsyStore: string;
    tiktok: string;
    pinterest: string;
  };
}

export type Locale = "en" | "es";
