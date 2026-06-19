import { Box, Button, Container, Link, Paper, Stack, Typography } from "@mui/material";
import { siteConfig } from "../config/site.config";
import { getStrings } from "../i18n";
import { SubscribeForm } from "./SubscribeForm";

const strings = getStrings();

export function LandingPage() {
  const { heroBackgroundImage, logoImage, etsyStoreUrl, tiktokUrl, pinterestUrl } = siteConfig;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        // Image when configured, dark gradient fallback underneath either way.
        backgroundColor: "background.default",
        backgroundImage: heroBackgroundImage
          ? `linear-gradient(rgba(18,18,18,0.55), rgba(18,18,18,0.75)), url(${heroBackgroundImage})`
          : "radial-gradient(120% 120% at 70% 30%, #1d1d1d 0%, #121212 60%, #0c0c0c 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 6, sm: 8 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "rgba(184, 142, 60, 0.35)",
            backgroundColor: "background.paper",
            backdropFilter: "blur(6px)",
            boxShadow: "0 0 40px rgba(184, 142, 60, 0.12)",
          }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            {logoImage ? (
              <Box
                component="img"
                src={logoImage}
                alt="B&D Realms"
                sx={{ height: { xs: 110, sm: 132 }, width: "auto" }}
              />
            ) : (
              <Typography
                variant="h2"
                sx={{ fontSize: "2rem", color: "primary.main", lineHeight: 1 }}
              >
                B&amp;D
              </Typography>
            )}

            <Typography variant="h1" sx={{ fontSize: { xs: "1.9rem", sm: "2.6rem" } }}>
              {strings.hero.title}
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 460 }}>
              {strings.hero.subtitle}
            </Typography>

            <Box sx={{ width: "100%", maxWidth: 380, mt: 1 }}>
              <SubscribeForm strings={strings} />
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: "center" }}>
        <Stack spacing={1.5} alignItems="center">
          <Button
            component="a"
            href={etsyStoreUrl}
            target="_blank"
            rel="noopener"
            variant="outlined"
            sx={{
              color: "primary.light",
              borderColor: "rgba(184, 142, 60, 0.5)",
              px: 3,
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(184, 142, 60, 0.08)",
              },
            }}
          >
            {strings.footer.etsyStore}
          </Button>
          <Stack direction="row" spacing={2}>
            <Link href={tiktokUrl} target="_blank" rel="noopener" variant="caption" color="text.secondary">
              {strings.footer.tiktok}
            </Link>
            <Link href={pinterestUrl} target="_blank" rel="noopener" variant="caption" color="text.secondary">
              {strings.footer.pinterest}
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
