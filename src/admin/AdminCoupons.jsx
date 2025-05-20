import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Skeleton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../api/CouponsAPI";
import CouponsModal from "../components/AdminCouponsModal";
import dayjs from "dayjs";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchCoupons = async (page = 1) => {
    setLoading(true);
    try {
      const result = await getCoupons(page);
      if (result.success) {
        const couponsWithKey = result.coupons.map((coupon, index) => ({
          ...coupon,
          _key: coupon.id || `${coupon.code}-${index}`,
        }));
        setCoupons(couponsWithKey);
        setPagination(result.pagination);
      } else {
        alert(result.message || "取得優惠券失敗");
      }
    } catch (error) {
      alert("取得優惠券發生錯誤：" + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons(1);
  }, []);

  const handlePageChange = (event, page) => {
    fetchCoupons(page);
  };

  const handleOpenModal = (coupon = null) => {
    setEditData(coupon);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("確定要刪除此優惠券嗎？")) return;
    try {
      const result = await deleteCoupon(id);
      if (result.success) {
        alert("優惠券已刪除");
        fetchCoupons(pagination.current_page || 1);
      } else {
        alert(result.message || "刪除失敗");
      }
    } catch (error) {
      alert("刪除發生錯誤：" + error.message);
    }
  };

  const handleCreate = async (couponData) => {
    try {
      const result = await createCoupon(couponData);
      if (result.success) {
        alert("優惠券已新增");
        fetchCoupons(pagination.current_page || 1);
        handleCloseModal();
      } else {
        alert(result.message || "新增優惠券失敗");
      }
    } catch (error) {
      alert("新增發生錯誤：" + error.message);
    }
  };

  const handleUpdate = async (couponData) => {
    if (!editData) return;
    try {
      const result = await updateCoupon(editData.id, couponData);
      if (result.success) {
        alert("優惠券已更新");
        fetchCoupons(pagination.current_page || 1);
        handleCloseModal();
      } else {
        alert(result.message || "更新優惠券失敗");
      }
    } catch (error) {
      alert("更新發生錯誤：" + error.message);
    }
  };

  const handleSubmit = (couponData) => {
    if (editData) {
      handleUpdate(couponData);
    } else {
      handleCreate(couponData);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="rectangular" width={120} height={36} />
          </>
        ) : (
          <>
            <Typography variant="h4">優惠券管理</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal(null)}
            >
              新增優惠券
            </Button>
          </>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {loading ? (
                <>
                  <TableCell>
                    <Skeleton width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={80} />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>標題</TableCell>
                  <TableCell>優惠代碼</TableCell>
                  <TableCell>折扣(%)</TableCell>
                  <TableCell>是否啟用</TableCell>
                  <TableCell>到期日</TableCell>
                  <TableCell align="center">操作</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? Array.from(new Array(5)).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))
              : coupons.map((coupon) => (
                  <TableRow key={coupon._key}>
                    <TableCell>{coupon.title}</TableCell>
                    <TableCell>{coupon.code || "無代碼"}</TableCell>
                    <TableCell>{coupon.percent}</TableCell>
                    <TableCell>
                      {coupon.is_enabled === 1 ? "啟用" : "停用"}
                    </TableCell>
                    <TableCell>
                      {coupon.due_date
                        ? dayjs.unix(coupon.due_date).format("YYYY-MM-DD")
                        : "無"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(coupon)}
                        aria-label="編輯"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(coupon.id)}
                        aria-label="刪除"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={pagination.total_pages}
          page={pagination.current_page}
          onChange={handlePageChange}
          color="primary"
          disabled={loading}
        />
      </Box>

      <CouponsModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </Container>
  );
};

export default AdminCoupons;
