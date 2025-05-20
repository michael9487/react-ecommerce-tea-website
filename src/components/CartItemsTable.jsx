import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const CartItemsTable = ({
  cartItems,
  totalPrice,
  discount = 0,
  onRemoveItem,
  onCloseModal,
  showEmptyAction = false,
}) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          目前購物車沒有商品
        </Typography>
        {showEmptyAction && (
          <Button
            variant="contained"
            color="error"
            component={Link}
            to="/products"
            onClick={() => {
              if (onCloseModal) onCloseModal();
            }}
          >
            回去逛逛
          </Button>
        )}
      </Paper>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", background: "#fafafa" }}>
                品名
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", background: "#fafafa" }}
              >
                數量
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", background: "#fafafa" }}
              >
                價格
              </TableCell>
              {onRemoveItem && (
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", background: "#fafafa" }}
                >
                  刪除
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, idx) => (
              <TableRow
                key={item.id}
                sx={{ backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "white" }}
              >
                <TableCell>{item.product.title}</TableCell>
                <TableCell align="center">x{item.qty}</TableCell>
                <TableCell align="right">
                  ${item.product.price * item.qty}
                </TableCell>
                {onRemoveItem && (
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onRemoveItem(item.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 總計與折扣後金額 */}
      <Box sx={{ textAlign: "right", mt: 2, mb: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            textDecoration: discount > 0 ? "line-through" : "none",
            color: discount > 0 ? "text.secondary" : "text.primary",
            display: "inline-block",
            mr: 2, // MUI spacing 16px
          }}
        >
          總計 ${totalPrice}
        </Typography>
        {discount > 0 && (
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            sx={{ display: "inline-block", ml: 1 }} // 左邊間距 8px
          >
            折扣後金額 ${totalPrice - discount}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CartItemsTable;
