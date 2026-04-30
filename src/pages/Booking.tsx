import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

interface Court {
  id: number;
  name: string;
  price: number;
}

const courts: Court[] = [
  { id: 1, name: "Court 1", price: 100000 },
  { id: 2, name: "Court 2", price: 120000 },
];

const BookingPage: React.FC = () => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [errors, setErrors] = useState<{ date?: string; time?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!date) newErrors.date = "Please select a date";
    if (!time) newErrors.time = "Please select a time";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log({ selectedCourt, date, time });
    alert("Booking success!");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book a Court
      </Typography>

      {/* COURT LIST */}
      <Grid container spacing={2}>
        {courts.map((court) => (
          <Grid item xs={12} md={4} key={court.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{court.name}</Typography>
                <Typography>{court.price} VND / hour</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedCourt(court)}>
                  Select
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* BOOKING FORM */}
      {selectedCourt && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Booking: {selectedCourt.name}
            </Typography>

            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              sx={{ mt: 2 }}
            />

            <TextField
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              error={!!errors.time}
              helperText={errors.time}
              sx={{ mt: 2 }}
            />

            <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default BookingPage;
