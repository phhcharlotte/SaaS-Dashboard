import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

const PaymentPage: React.FC = () => {
  const { state } = useLocation() as any;
  const navigate = useNavigate();

  if (!state) return <div>No booking data</div>;

  const { court, slot } = state;

  const handlePayment = () => {
    alert("Payment success!");
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">Booking Summary</Typography>

          <Typography sx={{ mt: 2 }}>Court: {court.name}</Typography>
          <Typography>Time: {slot}</Typography>
          <Typography>Price: {court.price} VND</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handlePayment}>
              Pay Now
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentPage;
