import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const orderStatusOptions = [
  { value: "pending", label: "待處理" },
  { value: "processing", label: "處理中" },
  { value: "shipped", label: "已出貨" },
  { value: "completed", label: "已完成" },
  { value: "cancelled", label: "已取消" },
];

const AdminOrderModal = ({ open, onClose, title, initialData, onSubmit }) => {
  const [order, setOrder] = useState({
    customerName: "",
    phone: "",
    address: "",
    status: "pending",
    notes: "",
    ...initialData,
  });

  useEffect(() => {
    if (open) {
      setOrder({
        customerName: "",
        phone: "",
        address: "",
        status: "pending",
        notes: "",
        ...initialData,
      });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(order);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              label="顧客姓名"
              name="customerName"
              value={order.customerName || ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              label="聯絡電話"
              name="phone"
              value={order.phone || ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="地址"
              name="address"
              value={order.address || ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
              multiline
              rows={2}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="訂單狀態"
              name="status"
              value={order.status || "pending"}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              {orderStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="備註"
              name="notes"
              value={order.notes || ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
              multiline
              rows={3}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button variant="contained" onClick={handleSubmit}>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminOrderModal;
