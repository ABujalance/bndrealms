/**
 * Single source of truth for everything you'll want to tweak without touching
 * components. Swap the background image, Etsy link, MailerLite IDs, brand colors
 * and fonts here.
 */

export interface SiteConfig {
  /** Brand colors. Fed straight into the MUI theme palette (see ../theme.ts). */
  colors: {
    charcoalBlack: string;
    oldGold: string;
    highlightGold: string;
    pureWhite: string;
  };
  fonts: {
    /** Display / heading font. Loaded in index.html. */
    heading: string;
    /** Body font. Loaded in index.html. */
    body: string;
  };
  /**
   * Hero background image. Drop a file in `public/images/` and point here, e.g.
   * "/images/dungeon-bg.jpg". Leave empty ("") to use the dark gradient fallback.
   */
  heroBackgroundImage: string;
  /** Logo image shown above the headline. Leave "" to fall back to a text "B&D" mark. */
  logoImage: string;
  /** Where the "Our Etsy store" footer link points. */
  etsyStoreUrl: string;
  /** MailerLite signup configuration (see ../services/subscribe.ts). */
  mailerLite: {
    /** Your MailerLite account id (numeric, from the embed snippet). */
    accountId: string;
    /** The form id of the embedded form you created in MailerLite. */
    formId: string;
  };
}

export const siteConfig: SiteConfig = {
  colors: {
    charcoalBlack: "#121212",
    oldGold: "#B88E3C",
    highlightGold: "#FCEFA6",
    pureWhite: "#FFFFFF",
  },
  fonts: {
    heading: '"Cinzel", serif',
    body: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  // TODO: drop your render in public/images/ and point here.
  heroBackgroundImage: "/images/dungeon-bg.jpg",
  // Brand logo (the "B&D" crest). "" falls back to a text mark.
  logoImage: "/images/logo.png",
  // TODO: replace with your real Etsy shop URL.
  etsyStoreUrl: "https://www.etsy.com/shop/BnDRealms",
  mailerLite: {
    // TODO: fill these from your MailerLite embedded-form snippet.
    accountId: "",
    formId: "",
  },
};
