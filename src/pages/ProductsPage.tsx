import { Box, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/ProductForm";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const { data, isLoading, create, update, remove } = useProducts({
    page: page + 1,
    limit: pageSize,
    search,
  });

  const handleSubmit = (values: any) => {
    if (editing) {
      update.mutate({ id: editing.id, data: values });
    } else {
      create.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: any) => (
        <>
          <Button
            size="small"
            onClick={() => {
              setEditing(params.row);
              setOpen(true);
            }}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => remove.mutate(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box className="flex gap-2 mb-4">
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add
        </Button>
      </Box>

      <div style={{ height: 400 }}>
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          loading={isLoading}
          rowCount={data?.total || 0}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
        />
      </div>

      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={editing || { name: "" }}
      />
    </Box>
  );
}
