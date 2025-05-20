import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { fetchOrders, updateOrder } from "../api/OrderAPI";
import AdminOrderModal from "../components/AdminOrderModal";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });
  const [loading, setLoading] = useState(false);

  // Modal 狀態
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);

  const statusMap = {
    pending: "待處理",
    processing: "處理中",
    shipped: "已出貨",
    completed: "已完成",
    cancelled: "已取消",
  };

  // 取得訂單列表
  const getOrders = async (page = 1) => {
    setLoading(true);
    const result = await fetchOrders(page);
    if (!result.success) {
      alert(result.message || "請重新登入");
      window.location.href = "/login";
      return;
    }
    setOrders(result.orders);
    setPagination(result.pagination);
    setLoading(false);
  };

  useEffect(() => {
    getOrders(1);
  }, []);

  const handlePageChange = (event, page) => {
    getOrders(page);
  };

  // 開啟編輯訂單 Modal
  const handleOpenEdit = (order) => {
    setCurrentOrder(order);
    setModalTitle("編輯訂單");
    setModalOpen(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentOrder(null);
  };

  // Modal 送出（更新訂單）
  const handleSubmit = async (orderData) => {
    const result = await updateOrder(currentOrder.id, orderData);
    if (result.success) {
      setModalOpen(false);
      setTimeout(() => {
        alert("訂單更新成功");
        getOrders(pagination.current_page);
      }, 200);
    } else {
      alert(result.message || "訂單更新失敗");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* 標題 skeleton */}
        {loading ? (
          <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        ) : (
          <Typography variant="h4" gutterBottom>
            訂單列表
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {loading ? (
                  <>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>訂單編號</TableCell>
                    <TableCell>顧客名稱</TableCell>
                    <TableCell>聯絡電話</TableCell>
                    <TableCell>訂單狀態</TableCell>
                    <TableCell align="right">總金額</TableCell>
                    <TableCell align="center">編輯</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="90%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="90%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="70%" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ display: "inline-block", mx: 0.5 }}
                      />
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ display: "inline-block", mx: 0.5 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    暫無訂單資料
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>
                      {statusMap[order.status] || order.status}
                    </TableCell>
                    <TableCell align="right">${order.total}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(order)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          {loading ? (
            <Skeleton variant="rectangular" width={200} height={40} />
          ) : (
            <Pagination
              count={pagination.total_pages}
              page={pagination.current_page}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </Box>

        {/* 編輯訂單 Modal */}
        <AdminOrderModal
          open={modalOpen}
          onClose={handleCloseModal}
          title={modalTitle}
          initialData={currentOrder}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}

export default AdminOrderList;
