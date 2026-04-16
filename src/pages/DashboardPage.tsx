import { Box, Typography, Paper } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4">Dashboard</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography>Total Products: 100</Typography>
        <Typography>Total Orders: 50</Typography>
      </Paper>
    </Box>
  );
}
