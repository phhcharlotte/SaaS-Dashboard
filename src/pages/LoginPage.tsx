import { Container, TextField, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // mock role theo email
    // if (email.includes("admin")) login("admin");
    // else if (email.includes("staff")) login("staff");
    // else login("user");

    navigate("/");
  };

  return (
    <Container sx={{ mt: 6, maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
