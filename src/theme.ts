import { createTheme } from "@mui/material/styles";
import { siteConfig } from "./config/site.config";

const { colors, fonts } = siteConfig;

/**
 * MUI theme derived entirely from siteConfig. Change colors/fonts in the config,
 * not here.
 */
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.oldGold,
      light: colors.highlightGold,
      contrastText: colors.charcoalBlack,
    },
    secondary: {
      main: colors.highlightGold,
      contrastText: colors.charcoalBlack,
    },
    background: {
      default: colors.charcoalBlack,
      paper: "rgba(18, 18, 18, 0.72)",
    },
    text: {
      primary: colors.pureWhite,
      secondary: "rgba(255, 255, 255, 0.72)",
    },
  },
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.heading,
      fontWeight: 700,
      letterSpacing: "0.02em",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: fonts.heading,
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.08em",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "uppercase" },
      },
    },
  },
});
