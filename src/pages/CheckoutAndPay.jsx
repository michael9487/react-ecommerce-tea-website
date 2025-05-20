import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import { getOrderDetail, payOrder } from "../api/CustomerAPI";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

const CheckoutAndPay = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [paying, setPaying] = useState(false);

  // Snackbar 狀態
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success, error, info, warning
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const result = await getOrderDetail(orderId);
      if (result.success) {
        setOrder(result.order);
        setErrorMsg("");
      } else {
        setErrorMsg(result.message || "取得訂單失敗");
      }
      setLoading(false);
    };

    if (orderId) {
      fetchOrder();
    } else {
      setErrorMsg("缺少訂單編號");
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderId]);

  const handlePay = async () => {
    if (!orderId) return;
    setPaying(true);
    const result = await payOrder(orderId);
    setPaying(false);

    if (result.success) {
      openSnackbar("付款完成！", "success");
      setLoading(true);
      const refreshed = await getOrderDetail(orderId);
      if (refreshed.success) {
        setOrder(refreshed.order);
        setErrorMsg("");
      } else {
        setErrorMsg(refreshed.message || "取得訂單失敗");
      }
      setLoading(false);
    } else {
      openSnackbar(result.message || "付款失敗，請稍後再試", "error");
    }
  };

  if (errorMsg) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          {errorMsg}
        </Typography>
      </Box>
    );
  }

  const products = order?.products ? Object.values(order.products) : [];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 1, p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        {/* 訂單明細標題 */}
        <Typography variant="h5" fontWeight="bold" mb={2} align="center">
          {loading ? <Skeleton width={120} /> : "訂單明細"}
        </Typography>

        <Stack spacing={1} mb={2}>
          <Typography>
            <strong>{loading ? <Skeleton width={80} /> : "訂單編號："}</strong>{" "}
            {loading ? <Skeleton width={200} /> : order.id}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={80} /> : "建立時間："}</strong>{" "}
            {loading ? (
              <Skeleton width={200} />
            ) : (
              formatTimestamp(order.create_at)
            )}
          </Typography>
          <Typography component="span">
            <strong>{loading ? <Skeleton width={80} /> : "付款狀態："}</strong>{" "}
            {loading ? (
              <Skeleton width={60} />
            ) : order.is_paid ? (
              <Chip label="已付款" color="success" size="small" />
            ) : (
              <Chip label="未付款" color="warning" size="small" />
            )}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={80} /> : "付款方式："}</strong>{" "}
            {loading ? <Skeleton width={100} /> : order.payment_method || "無"}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={80} /> : "留言："}</strong>{" "}
            {loading ? <Skeleton width={250} /> : order.message || "無"}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* 使用者資訊標題 */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {loading ? <Skeleton width={100} /> : "使用者資訊"}
        </Typography>
        <Stack spacing={1} mb={2}>
          <Typography>
            <strong>{loading ? <Skeleton width={60} /> : "姓名："}</strong>{" "}
            {loading ? <Skeleton width={150} /> : order.user.name}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={60} /> : "電話："}</strong>{" "}
            {loading ? <Skeleton width={150} /> : order.user.tel}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={60} /> : "信箱："}</strong>{" "}
            {loading ? <Skeleton width={200} /> : order.user.email}
          </Typography>
          <Typography>
            <strong>{loading ? <Skeleton width={60} /> : "地址："}</strong>{" "}
            {loading ? <Skeleton width={250} /> : order.user.address}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* 訂單商品標題 */}
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {loading ? <Skeleton width={100} /> : "訂單商品"}
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
          <Table stickyHeader size="small" aria-label="訂單商品列表">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", background: "#fafafa" }}>
                  {loading ? <Skeleton /> : "品名"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", background: "#fafafa" }}
                >
                  {loading ? <Skeleton /> : "數量"}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", background: "#fafafa" }}
                >
                  {loading ? <Skeleton /> : "小計"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? [1, 2, 3].map((i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell align="center">
                        <Skeleton />
                      </TableCell>
                      <TableCell align="right">
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))
                : products.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ verticalAlign: "middle" }}>
                        {item.product.title}
                      </TableCell>
                      <TableCell
                        sx={{ verticalAlign: "middle" }}
                        align="center"
                      >
                        {item.qty} / {item.product.unit}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "middle" }} align="right">
                        ${item.final_total}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {loading ? <Skeleton width={100} /> : `總計：$${order.total}`}
          </Typography>

          {!loading && !order.is_paid && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePay}
              disabled={paying}
              sx={{ mt: 2 }}
            >
              {paying ? "付款中..." : "確認付款"}
            </Button>
          )}
        </Box>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutAndPay;
