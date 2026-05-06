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
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Court {
  id: number;
  name: string;
  price: number;
}

interface Slot {
  time: string;
  available: boolean;
}

type BookingType = "casual" | "fixed";

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

  const [bookingType, setBookingType] = useState<BookingType>("casual");
  const [duration, setDuration] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();

  // ================= PRICE =================
  const getPrice = () => {
    if (!selectedCourt) return 0;

    if (bookingType === "casual") {
      return selectedCourt.price;
    }

    const discountMap: Record<number, number> = {
      1: 0.9,
      3: 0.85,
      6: 0.8,
      12: 0.7,
    };

    if (!duration) return 0;

    return Math.round(
      selectedCourt.price * duration * 4 * discountMap[duration],
    );
  };

  // ================= START DATE =================
  const getStartDate = () => {
    const today = new Date();
    const week = Math.ceil(today.getDate() / 7);

    if (week > 1) {
      return new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }

    return today;
  };

  const handleBooking = () => {
    if (!selectedCourt || !selectedSlot) return;

    navigate("/payment", {
      state: {
        court: selectedCourt,
        slot: selectedSlot,
        type: bookingType,
        duration,
        total: getPrice(),
        startDate: getStartDate(),
      },
    });
  };

  // ================= FILTER =================
  const filteredCourts = useMemo(() => {
    return courts.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());

      const slots = slotsByCourt[c.id] || [];

      const hasSlot = slots.some((s) => {
        const okTime = inRange(s.time, startTime, endTime);
        const okAvail = onlyAvailable ? s.available : true;
        return okTime && okAvail;
      });

      return matchSearch && hasSlot;
    });
  }, [search, onlyAvailable, startTime, endTime]);

  const currentSlots = useMemo(() => {
    if (!selectedCourt) return [];
    return (slotsByCourt[selectedCourt.id] || []).filter((s) =>
      inRange(s.time, startTime, endTime),
    );
  }, [selectedCourt, startTime, endTime]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Book a Court</Typography>

      {/* FILTER */}
      <Stack direction="row" spacing={2} sx={{ my: 3 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
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
      </Stack>

      {/* COURTS */}
      <Grid container spacing={2}>
        {filteredCourts.map((court) => (
          <Grid item xs={12} md={4} key={court.id}>
            <Card>
              <CardActionArea
                onClick={() => {
                  setSelectedCourt(court);
                  setSelectedSlot("");
                }}>
                <CardContent>
                  <Typography variant="h6">{court.name}</Typography>
                  <Typography>{court.price} VND</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* SLOT */}
      {selectedCourt && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography>Slots - {selectedCourt.name}</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {currentSlots.map((slot) => (
                <Chip
                  key={slot.time}
                  label={slot.time}
                  clickable={slot.available}
                  color={slot.available ? "success" : "default"}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                />
              ))}
            </Stack>

            {/* BOOKING TYPE */}
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Chip
                label="Vãng lai"
                clickable
                color={bookingType === "casual" ? "primary" : "default"}
                onClick={() => {
                  setBookingType("casual");
                  setDuration(null);
                }}
              />
              <Chip
                label="Cố định"
                clickable
                color={bookingType === "fixed" ? "primary" : "default"}
                onClick={() => setBookingType("fixed")}
              />
            </Stack>

            {/* DURATION */}
            {bookingType === "fixed" && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {[1, 3, 6, 12].map((m) => (
                  <Chip
                    key={m}
                    label={`${m} tháng`}
                    clickable
                    color={duration === m ? "primary" : "default"}
                    onClick={() => setDuration(m)}
                  />
                ))}
              </Stack>
            )}

            {/* PRICE */}
            <Typography sx={{ mt: 2 }}>Total: {getPrice()} VND</Typography>

            {bookingType === "fixed" && duration && (
              <Typography color="text.secondary">
                Start from: {getStartDate().toLocaleDateString()}
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!selectedSlot || (bookingType === "fixed" && !duration)}
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
