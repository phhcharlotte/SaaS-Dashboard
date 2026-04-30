// ================= USER BOOKING (ADD TIME RANGE FILTER) =================

import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Court {
  id: number;
  name: string;
  price: number; // VND/hour
}

interface Slot {
  time: string; // HH:mm
  available: boolean;
}

const courts: Court[] = [
  { id: 1, name: "Court 1", price: 100000 },
  { id: 2, name: "Court 2", price: 120000 },
  { id: 3, name: "Court 3", price: 80000 },
];

const slotsByCourt: Record<number, Slot[]> = {
  1: [
    { time: "09:00", available: true },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
  ],
  2: [
    { time: "09:00", available: false },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
  ],
  3: [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
  ],
};

// helper so sánh giờ "HH:mm"
const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const inRange = (t: string, start?: string, end?: string) => {
  const x = toMinutes(t);
  const s = start ? toMinutes(start) : -Infinity;
  const e = end ? toMinutes(end) : Infinity;
  return x >= s && x <= e;
};

const BookingPage: React.FC = () => {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Filters
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const navigate = useNavigate();

  const handleBooking = () => {
    if (!selectedCourt || !selectedSlot) return;

    navigate("/payment", {
      state: {
        court: selectedCourt,
        slot: selectedSlot,
      },
    });
  };

  const filteredCourts = useMemo(() => {
    return courts.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      const min = minPrice ? Number(minPrice) : -Infinity;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      const matchPrice = c.price >= min && c.price <= max;

      const slots = slotsByCourt[c.id] || [];

      // lọc theo khung giờ + trạng thái
      const hasSlotInRange = slots.some((s) => {
        const okTime = inRange(
          s.time,
          startTime || undefined,
          endTime || undefined,
        );
        const okAvail = onlyAvailable ? s.available : true;
        return okTime && okAvail;
      });

      const matchAvailability = hasSlotInRange;

      return matchSearch && matchPrice && matchAvailability;
    });
  }, [search, minPrice, maxPrice, onlyAvailable, startTime, endTime]);

  const currentSlots = useMemo(() => {
    if (!selectedCourt) return [] as Slot[];
    const slots = slotsByCourt[selectedCourt.id] || [];
    return slots.filter((s) =>
      inRange(s.time, startTime || undefined, endTime || undefined),
    );
  }, [selectedCourt, startTime, endTime]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book a Court
      </Typography>

      {/* FILTERS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search court"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <TextField
          label="Min price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <TextField
          label="Max price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <TextField
          label="Start time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <TextField
          label="End time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
          }
          label="Only available"
        />

        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setMinPrice("");
            setMaxPrice("");
            setOnlyAvailable(false);
            setStartTime("");
            setEndTime("");
          }}>
          Reset
        </Button>
      </Stack>

      {/* COURT LIST */}
      <Grid container spacing={2}>
        {filteredCourts.map((court) => (
          <Grid item xs={12} md={4} key={court.id}>
            <Card
              onClick={() => {
                setSelectedCourt(court);
                setSelectedSlot("");
              }}
              sx={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h6">{court.name}</Typography>
                <Typography>{court.price} VND / hour</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SLOT VIEW */}
      {selectedCourt && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Available Slots - {selectedCourt.name}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {currentSlots.map((slot) => (
                <Chip
                  key={slot.time}
                  label={slot.time}
                  color={slot.available ? "success" : "default"}
                  clickable={slot.available}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  variant={selectedSlot === slot.time ? "filled" : "outlined"}
                />
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!selectedSlot}
              onClick={handleBooking}>
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default BookingPage;
