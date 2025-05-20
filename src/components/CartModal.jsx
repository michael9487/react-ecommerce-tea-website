import React from "react";
import {
  Box,
  Typography,
  Modal,
  Divider,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartItemsTable from "./CartItemsTable";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  display: "flex",
  flexDirection: "column",
};

const CartModal = ({
  open,
  onClose,
  cartItems,
  totalPrice,
  discount = 0,
  onRemoveItem,
  onCheckout,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      disableScrollLock
      aria-labelledby="cart-modal-title"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="cart-modal-title"
          variant="h6"
          fontWeight="bold"
          mb={2}
          align="center"
        >
          購物車
        </Typography>

        <CartItemsTable
          cartItems={cartItems}
          totalPrice={totalPrice}
          discount={discount}
          showEmptyAction={true}
          onRemoveItem={onRemoveItem}
          onCloseModal={onClose} // 傳入關閉 Modal 函式
        />

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={onClose}>
            關閉
          </Button>
          <Button
            variant="contained"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
          >
            結帳
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CartModal;
