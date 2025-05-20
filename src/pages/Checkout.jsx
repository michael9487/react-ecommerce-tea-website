import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  TextField,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CartItemsTable from "../components/CartItemsTable";
import { applyCoupon, submitOrder } from "../api/CustomerAPI";

const Checkout = () => {
  const { cartItems = [], totalPrice = 0, onRemoveItem } = useOutletContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const { fetchCart } = useOutletContext();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    },
    mode: "onTouched",
  });

  const handleSnackbarClose = () => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };

  // 套用優惠券
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setSnackbarState({
        open: true,
        message: "請輸入優惠碼",
        severity: "warning",
      });
      return;
    }
    setLoadingCoupon(true);
    const result = await applyCoupon(coupon.trim());
    setLoadingCoupon(false);
    if (result.success) {
      const newDiscount = totalPrice - result.finalTotal;
      setDiscount(newDiscount > 0 ? newDiscount : 0);
      setSnackbarState({
        open: true,
        message: result.message,
        severity: "success",
      });
    } else {
      setDiscount(0);
      setSnackbarState({
        open: true,
        message: result.message || "優惠碼無效",
        severity: "error",
      });
    }
  };

  // 取消優惠券
  const handleCancelCoupon = () => {
    setCoupon("");
    setDiscount(0);
  };

  // 防XSS
  const sanitizeInput = (input) => {
    if (!input) return "";
    return input.replace(/<[^>]*>?/gm, "");
  };

  // 送出訂單並跳轉
  const onSubmit = async (data) => {
    const payload = {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.phone,
          address: data.address,
        },
        message: sanitizeInput(data.message),
      },
    };

    const result = await submitOrder(payload);

    if (result.success && result.orderId) {
      await fetchCart();
      navigate(`/checkout-pay/${result.orderId}`);
    } else {
      setSnackbarState({
        open: true,
        message: result.message || "訂單送出失敗，請稍後再試",
        severity: "error",
      });
    }
  };

  return (
    <Box maxWidth="md" mx="auto" my={4} p={3} component={Paper}>
      {/* Snackbar 訊息提示 */}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarState.severity}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>

      {/* 標題 */}
      {loading ? (
        <Skeleton variant="text" width={180} height={40} sx={{ mb: 3 }} />
      ) : (
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          訂單資料
        </Typography>
      )}

      {/* 購物車列表 */}
      {loading ? (
        <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />
      ) : (
        <CartItemsTable
          cartItems={cartItems}
          totalPrice={totalPrice}
          discount={discount}
          onRemoveItem={onRemoveItem}
        />
      )}

      {/* 優惠券區塊 */}
      {loading ? (
        <>
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={300} />
        </>
      ) : (
        cartItems.length > 0 && (
          <>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              mb={2}
              mt={2}
            >
              <TextField
                label="輸入優惠碼"
                size="small"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={loadingCoupon || discount > 0}
              />
              <Button
                variant="outlined"
                onClick={handleApplyCoupon}
                disabled={loadingCoupon || discount > 0}
              >
                {loadingCoupon ? "套用中..." : "使用"}
              </Button>
              {discount > 0 && (
                <>
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleCancelCoupon}
                  >
                    取消優惠券
                  </Button>
                  <Typography color="success.main" sx={{ ml: 1 }}>
                    已折抵 ${discount}
                  </Typography>
                </>
              )}
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                {/* 姓名 */}
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "請輸入姓名",
                    pattern: {
                      value: /^[\u4e00-\u9fa5a-zA-Z\s]+$/,
                      message: "姓名只能包含中文、英文和空白",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="姓名"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 電話 */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "請輸入電話",
                    pattern: {
                      value: /^((09[0-9]{8})|(0[2-8]{1}[0-9]{7}))$/,
                      message: "電話格式不正確",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="電話"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 信箱 */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "請輸入信箱",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "信箱格式不正確",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="信箱"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 地址 */}
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: "請輸入地址",
                    pattern: {
                      value: /^[^<>#%$]*$/,
                      message: "地址含有不允許的特殊字元",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="地址"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 留言 */}
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: "留言不可超過 500 字",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="留言"
                      multiline
                      rows={4}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!formState.isValid}
                >
                  送出訂單
                </Button>
              </Stack>
            </form>
          </>
        )
      )}
    </Box>
  );
};

export default Checkout;
