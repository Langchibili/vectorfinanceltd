'use client'

import { Box, Paper, Typography } from "@mui/material";

export default function SessionLetter() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", my: 6, px: 2, mt: 10 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Vector Finance Limited — Session Letter
        </Typography>
      
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>VectorFinanceLimited</strong><br />
          Email: <a href="mailto:info@vectorfinancelimited.com">info@vectorfinancelimited.com</a><br />
          Address: Plot 15 Lagos Road, GardenView Properties Rhodes Park Lusaka
        </Typography>
        <hr />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
          End of document
        </Typography>
      </Paper>
    </Box>
  );
}