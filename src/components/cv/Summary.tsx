import { Card, CardContent, Divider, Typography } from "@mui/material";

interface SummaryProps {
  summary: string | null | undefined;
}

export function Summary({ summary }: SummaryProps) {
  if (!summary) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom component="h2">
          Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}
