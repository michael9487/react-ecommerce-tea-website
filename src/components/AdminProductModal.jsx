import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const AdminProductModal = ({ open, onClose, title, initialData, onSubmit }) => {
  const [product, setProduct] = useState({
    category: "",
    title: "",
    content: "",
    description: "",
    image: "",
    imageUrl: "",
    origin_price: 0,
    price: 0,
    unit: "",
    num: 0,
    is_enabled: 1,
    ...initialData,
  });

  useEffect(() => {
    if (open) {
      setProduct({
        category: "",
        title: "",
        content: "",
        description: "",
        image: "",
        imageUrl: "",
        origin_price: 0,
        price: 0,
        unit: "",
        num: 0,
        is_enabled: 1,
        ...initialData,
      });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "origin_price" || name === "price" || name === "num"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(product);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeAfterTransition={false}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid2 container spacing={3}>
          {/* 左側圖片網址與預覽 */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <TextField
              label="輸入圖片網址"
              name="imageUrl"
              value={product.imageUrl || ""}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            {/* 你可以在這裡加上檔案上傳的按鈕與預覽 */}
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                border: "1px solid #ddd",
                borderRadius: 1,
                overflow: "hidden",
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafafa",
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt="產品圖片預覽"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <Typography color="textSecondary">無預覽圖片</Typography>
              )}
            </Box>
          </Grid2>

          {/* 右側表單欄位 */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  autoFocus
                  label="標題"
                  name="title"
                  value={product.title || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  label="分類"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <TextField
                  label="單位"
                  name="unit"
                  value={product.unit}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, md: 3 }}>
                <TextField
                  label="原價"
                  name="origin_price"
                  type="number"
                  value={product.origin_price}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, md: 3 }}>
                <TextField
                  label="售價"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  label="產品描述"
                  name="content"
                  value={product.content}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  multiline
                  rows={2}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  label="說明內容"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  multiline
                  rows={2}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, md: 3 }}>
                <TextField
                  label="數量"
                  name="num"
                  type="number"
                  value={product.num}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid2>
            </Grid2>
            {/* 是否啟用 */}
            {/* <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product.is_enabled === 1}
                    onChange={handleEnabledChange}
                  />
                }
                label="是否啟用"
              />
            </Box> */}
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

export default AdminProductModal;
