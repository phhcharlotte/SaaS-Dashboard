// ================= ADMIN (MANAGER) DASHBOARD =================

// pages/Admin.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

interface Staff {
  id: number;
  name: string;
  email: string;
}

interface Court {
  id: number;
  name: string;
  price: number;
}

const initialStaff: Staff[] = [
  { id: 1, name: "Hoang", email: "hoang@gmail.com" },
  { id: 2, name: "An", email: "an@gmail.com" },
];

const initialCourts: Court[] = [
  { id: 1, name: "Court 1", price: 100000 },
  { id: 2, name: "Court 2", price: 120000 },
];

const Admin: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [courts, setCourts] = useState<Court[]>(initialCourts);

  const [newStaff, setNewStaff] = useState({ name: "", email: "" });
  const [newCourt, setNewCourt] = useState({ name: "", price: "" });

  // ================= STAFF =================
  const addStaff = () => {
    if (!newStaff.name || !newStaff.email) return;
    setStaff([...staff, { id: Date.now(), ...newStaff }]);
    setNewStaff({ name: "", email: "" });
  };

  const staffColumns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  // ================= COURT =================
  const addCourt = () => {
    if (!newCourt.name || !newCourt.price) return;
    setCourts([
      ...courts,
      { id: Date.now(), name: newCourt.name, price: Number(newCourt.price) },
    ]);
    setNewCourt({ name: "", price: "" });
  };

  const courtColumns: GridColDef[] = [
    { field: "name", headerName: "Court", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* STAFF MANAGEMENT */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Manage Staff</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={newStaff.name}
              onChange={(e) =>
                setNewStaff({ ...newStaff, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff({ ...newStaff, email: e.target.value })
              }
            />
            <Button variant="contained" onClick={addStaff}>
              Add
            </Button>
          </Stack>

          <div style={{ height: 300, marginTop: 20 }}>
            <DataGrid rows={staff} columns={staffColumns} />
          </div>
        </CardContent>
      </Card>

      {/* COURT MANAGEMENT */}
      <Card>
        <CardContent>
          <Typography variant="h6">Manage Courts</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Court Name"
              value={newCourt.name}
              onChange={(e) =>
                setNewCourt({ ...newCourt, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={newCourt.price}
              onChange={(e) =>
                setNewCourt({ ...newCourt, price: e.target.value })
              }
            />
            <Button variant="contained" onClick={addCourt}>
              Add
            </Button>
          </Stack>

          <div style={{ height: 300, marginTop: 20 }}>
            <DataGrid rows={courts} columns={courtColumns} />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Admin;

// ================= FEATURES =================
/*
ADMIN có thể:
- Tạo nhân viên
- Xem danh sách nhân viên
- Tạo sân
- Xem danh sách sân

NEXT (pro):
- Edit/Delete staff & court
- Upload ảnh sân
- Config giá theo giờ
- Dashboard doanh thu
*/
