// ================= STAFF DASHBOARD (MUI DataGrid + Filter + Invoice) =================

// pages/StaffDashboard.tsx
import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

interface Booking {
  id: number;
  courtName: string;
  customer: string;
  time: string; // "09:00 - 10:00"
  date: string; // yyyy-mm-dd
  status: "pending" | "confirmed" | "done";
  price: number; // per hour total for demo
}

const seed: Booking[] = [
  {
    id: 1,
    courtName: "Court 1",
    customer: "Hoang",
    time: "09:00 - 10:00",
    date: "2026-05-01",
    status: "pending",
    price: 100000,
  },
  {
    id: 2,
    courtName: "Court 2",
    customer: "An",
    time: "10:00 - 11:00",
    date: "2026-05-01",
    status: "confirmed",
    price: 120000,
  },
  {
    id: 3,
    courtName: "Court 1",
    customer: "Minh",
    time: "11:00 - 12:00",
    date: "2026-05-02",
    status: "done",
    price: 100000,
  },
];

const statusColor = (s: Booking["status"]) =>
  s === "pending" ? "warning" : s === "confirmed" ? "success" : "default";

const StaffDashboard: React.FC = () => {
  const [rows, setRows] = useState<Booking[]>(seed);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.courtName.toLowerCase().includes(search.toLowerCase());
      const matchDate = dateFilter ? r.date === dateFilter : true;
      return matchSearch && matchDate;
    });
  }, [rows, search, dateFilter]);

  const handleConfirm = (id: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "confirmed" } : r)),
    );
  };

  const handleCancel = (id: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "pending" } : r)),
    );
  };

  const handleInvoice = (row: Booking) => {
    // demo: in real app call API -> get PDF/print
    alert(
      `Invoice\nCustomer: ${row.customer}\nCourt: ${row.courtName}\nTime: ${row.time}\nDate: ${row.date}\nTotal: ${row.price} VND`,
    );
  };

  const columns: GridColDef<Booking>[] = [
    { field: "courtName", headerName: "Court", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor(params.value) as any}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        const r = params.row as Booking;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleConfirm(r.id)}>
              Confirm
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleCancel(r.id)}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => handleInvoice(r)}>
              Invoice
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Staff Dashboard
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Search (customer/court)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <TextField
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setSearch("");
            setDateFilter("");
          }}>
          Reset
        </Button>
      </Stack>

      {/* DataGrid */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default StaffDashboard;
