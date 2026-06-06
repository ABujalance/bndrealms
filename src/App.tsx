import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage />
    </ThemeProvider>
  );
}
