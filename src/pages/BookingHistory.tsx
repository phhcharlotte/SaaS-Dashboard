// ================= BOOKING HISTORY PAGE =================

// pages/BookingHistory.tsx
import React, { useState } from "react";
import { Container, Typography, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Booking {
  id: number;
  courtName: string;
  time: string;
  date: string;
  status: "pending" | "confirmed" | "paid" | "cancelled";
}

const initialData: Booking[] = [
  {
    id: 1,
    courtName: "Court 1",
    time: "09:00",
    date: "2026-05-01",
    status: "pending",
  },
  {
    id: 2,
    courtName: "Court 2",
    time: "10:00",
    date: "2026-05-02",
    status: "confirmed",
  },
  {
    id: 3,
    courtName: "Court 1",
    time: "11:00",
    date: "2026-05-03",
    status: "paid",
  },
];

const getColor = (status: Booking["status"]) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "info";
    case "paid":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const BookingHistory: React.FC = () => {
  const [rows] = useState<Booking[]>(initialData);

  const columns: GridColDef<Booking>[] = [
    { field: "courtName", headerName: "Court", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getColor(params.value) as any}
          size="small"
        />
      ),
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking History
      </Typography>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
      </div>
    </Container>
  );
};

export default BookingHistory;
