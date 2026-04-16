import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import useAuth from "../hooks/Auth/auth";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5">Login</Typography>
        <TextField fullWidth label="Username" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={login}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}
