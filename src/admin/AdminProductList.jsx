import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
import { Edit, Delete } from "@mui/icons-material";
import {
  fetchProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../api/ProductAPI";
import AdminProductModal from "../components/AdminProductModal";

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total_pages: 1,
    current_page: 1,
  });
  const [loading, setLoading] = useState(false);

  // Modal 狀態
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  // 取得產品列表
  const getProducts = async (page = 1) => {
    setLoading(true);
    const result = await fetchProducts(page);
    if (!result.success) {
      alert(result.message || "請重新登入");
      window.location.href = "/login";
      return;
    }
    setProducts(result.products);
    setPagination(result.pagination);
    setLoading(false);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const handlePageChange = (event, page) => {
    getProducts(page);
  };

  // 開啟「建立新商品」Modal
  const handleOpenCreate = () => {
    setCurrentProduct(null); // 建立時不帶資料
    setModalTitle("建立新產品");
    setModalOpen(true);
  };

  // 開啟「編輯商品」Modal
  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setModalTitle("編輯產品");
    setModalOpen(true);
  };

  //刪除商品
  const handleDelete = async (productId) => {
    if (!window.confirm("確定要刪除此產品嗎？")) return;

    const result = await deleteProduct(productId);
    if (result.success) {
      alert("產品刪除成功");
      getProducts(pagination.current_page); // 重新取得產品列表
    } else {
      alert(result.message || "產品刪除失敗");
    }
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentProduct(null);
  };

  // Modal 送出
  const handleSubmit = async (productData) => {
    let result;
    if (currentProduct && currentProduct.id) {
      // 編輯
      result = await updateProduct(currentProduct.id, productData);
    } else {
      // 建立
      result = await createProduct(productData);
    }

    setModalOpen(false); // 先關閉 Modal

    setTimeout(() => {
      if (result.success) {
        alert(
          currentProduct && currentProduct.id ? "產品更新成功" : "產品建立成功"
        );
        getProducts(pagination.current_page);
      } else {
        alert(
          result.message ||
            (currentProduct && currentProduct.id
              ? "產品更新失敗"
              : "產品建立失敗")
        );
      }
    }, 200); // 延遲 200ms，確保 Modal 完全關閉
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* 標題與新增按鈕 skeleton 整合 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="rectangular" width={120} height={36} />
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                產品列表
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreate}
              >
                建立新商品
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
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width={60} />
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
                    <TableCell>分類</TableCell>
                    <TableCell>產品名稱</TableCell>
                    <TableCell align="right">原價</TableCell>
                    <TableCell align="right">售價</TableCell>
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
                    <TableCell align="right">
                      <Skeleton variant="text" width="60%" />
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
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    暫無商品資料
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell align="right">${product.origin_price}</TableCell>
                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
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

        {/* 共用 Modal，建立/編輯都用這個 */}
        <AdminProductModal
          open={modalOpen}
          onClose={handleCloseModal}
          title={modalTitle}
          initialData={currentProduct}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}

export default AdminProductList;
