import { useState, type FormEvent } from "react";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { subscribe, isValidEmail } from "../services/subscribe";
import type { Strings } from "../i18n";

type Status = "idle" | "submitting" | "success" | "invalid" | "error";

interface SubscribeFormProps {
  strings: Strings;
}

export function SubscribeForm({ strings }: SubscribeFormProps) {
  const t = strings.form;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!isValidEmail(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("submitting");
    const result = await subscribe(email);

    if (result.status === "ok") {
      setStatus("success");
      setEmail("");
    } else if (result.status === "invalid_email") {
      setStatus("invalid");
    } else {
      setStatus("error");
      if (result.message) console.error("[subscribe]", result.message);
    }
  }

  if (status === "success") {
    return (
      <Typography role="status" sx={{ color: "primary.light", py: 1.5 }}>
        {t.success}
      </Typography>
    );
  }

  const helperText =
    status === "invalid" ? t.invalidEmail : status === "error" ? t.error : " ";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        placeholder={t.emailPlaceholder}
        aria-label={t.emailLabel}
        error={status === "invalid" || status === "error"}
        helperText={helperText}
        fullWidth
        disabled={isSubmitting}
        slotProps={{ formHelperText: { sx: { m: 0, minHeight: "1.25em" } } }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
      >
        {isSubmitting ? t.submitting : t.submit}
      </Button>
    </Box>
  );
}
