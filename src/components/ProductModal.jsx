import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  CardMedia,
  IconButton,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";

export default function ProductModal({ open, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  const handleAdd = async () => {
    setLoading(true);
    await onAddToCart(product, quantity);
    setLoading(false);
    handleClose();
  };

  const subtotal = product.price * quantity;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", sm: 600 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {product.title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <CardMedia
          component="img"
          image={product.imageUrl || "https://via.placeholder.com/400x200"}
          alt={product.title}
          sx={{ height: "400px", objectFit: "cover" }}
        />

        <Box sx={{ px: 3 }}>
          <Typography variant="h6" mb={1}>
            {product.content}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {product.description}
          </Typography>
        </Box>

        <Grid2
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 3, mb: 2 }}
        >
          <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
            原價 ${product.origin_price}
          </Typography>
          <Typography variant="h6" color="error" fontWeight="bold">
            現在只要 ${product.price}
          </Typography>
        </Grid2>

        <Box sx={{ px: 3, mb: 2 }}>
          <Select
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
          >
            {[...Array(20)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                選購 {i + 1}
                {product.unit}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            bgcolor: "#f5f5f5",
            px: 3,
            py: 2,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            小計 ${subtotal}
          </Typography>
          <Button variant="contained" disabled={loading} onClick={handleAdd}>
            {loading ? "處理中..." : "加入購物車"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
