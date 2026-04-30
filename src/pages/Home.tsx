// ================= HOME PAGE (USER LANDING) =================

// pages/Home.tsx
import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 6 }}>
      {/* HERO */}
      <Typography variant="h3" gutterBottom>
        Welcome to Pickleball Booking
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Book your court quickly and easily
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={() => navigate("/bookings")}>
        Book Now
      </Button>

      {/* FEATURES */}
      <Grid container spacing={3} sx={{ mt: 6 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Easy Booking</Typography>
              <Typography color="text.secondary">
                Choose your court and time in seconds
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Real-time Availability</Typography>
              <Typography color="text.secondary">
                See available slots instantly
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fast Check-in</Typography>
              <Typography color="text.secondary">
                Quick and simple process at the court
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

// ================= NOTES =================
/*
HOME PAGE gồm:
- Hero section (title + CTA)
- Feature section (giới thiệu)

NEXT:
- Add banner image
- Add navbar auth (login/register)
- Add testimonials / pricing
*/
