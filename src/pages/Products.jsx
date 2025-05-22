import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Alert,
  Container,
  Box,
  Skeleton,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import ProductModal from "../components/ProductModal";
import { addToCart } from "../api/CustomerAPI";
import { useOutletContext, useNavigate } from "react-router-dom";

const apiPath = "https://vue-course-api.hexschool.io";
const customPath = "supercurry";

const Products = () => {
  const { fetchCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${apiPath}/api/${customPath}/products?page=${currentPage}`
      );
      if (res.data.success) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } else {
        setError("資料讀取失敗，請稍後再試");
      }
    } catch (err) {
      setError("發生錯誤：" + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("alreadyShared");
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleAddToCart = async (product, quantity) => {
    if (!quantity || quantity <= 0) {
      showSnackbar("請選擇購買數量", "warning");
      return;
    }

    const result = await addToCart(product.id, quantity);

    if (result.success) {
      showSnackbar(result.message || "已加入購物車");
      fetchCart();
    } else {
      showSnackbar(result.message || "加入購物車失敗", "error");
    }
  };

  const renderSkeletonCards = () => (
    <Grid2 container spacing={2}>
      {[...Array(6)].map((_, i) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={i}>
          <Card
            sx={{
              height: 350,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ height: 200, borderRadius: 2, mb: 2 }}
            />
            <CardContent>
              <Typography variant="h6">
                <Skeleton width="80%" />
              </Typography>
              <Typography>
                <Skeleton width="60%" />
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );

  const navigate = useNavigate();

  // === 這裡是修正的 handleShareProduct ===
  const handleShareProduct = useCallback(
    async (productId, productTitle) => {
      const appToken = localStorage.getItem("app_token");

      if (!window.liff) {
        console.log("LIFF 尚未初始化");
      }

      if (!window.liff || !window.liff.isLoggedIn() || !appToken) {
        const redirectUrl = `/products#share-${productId}`;
        navigate(`/liff-login?redirect=${encodeURIComponent(redirectUrl)}`);
        return;
      }

      try {
        await window.liff.shareTargetPicker([
          {
            type: "text",
            text: `📦 我在 LINE 商城看到這個產品：「${productTitle}」\n👉 點我看看：https://react-ecommerce-tea-website.vercel.app/products#product-${productId}`,
          },
        ]);
        showSnackbar("已分享至聊天室");
      } catch (error) {
        console.error("分享失敗：", error.message, error);
        showSnackbar(
          "分享失敗：" + (error.message || "請確認您已授權 LIFF"),
          "error"
        );
      }
    },
    [navigate, showSnackbar]
  );

  useEffect(() => {
    const hash = window.location.hash;
    const alreadyShared = sessionStorage.getItem("alreadyShared");

    if (hash.startsWith("#share-") && !alreadyShared) {
      const productId = hash.replace("#share-", "");
      const product = products.find((p) => p.id === productId);

      if (product) {
        handleShareProduct(product.id, product.title);
        window.location.hash = ""; // 清掉 hash 避免重複觸發
        sessionStorage.setItem("alreadyShared", "true"); // 記錄已分享
      }
    }
  }, [products, handleShareProduct]);

  useEffect(() => {
    const hash = window.location.hash;
    if (products.length > 0 && hash.startsWith("#product-")) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", window.location.pathname);
        }
      }, 100);
    }
  }, [products]);

  return (
    <Box sx={{ backgroundColor: "#C0C0C0" }}>
      <Container sx={{ py: 4 }}>
        {loading ? (
          renderSkeletonCards()
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <>
            <Grid2 container spacing={3}>
              {products.map((product) => (
                <Grid2
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={product.id}
                  id={`product-${product.id}`}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        product.imageUrl ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={product.title}
                    />
                    <CardContent
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="h6" noWrap>
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            backgroundColor: "#e0e0e0",
                            borderRadius: 1,
                            px: 1,
                            fontSize: "0.75rem",
                          }}
                        >
                          {product.category}
                        </Typography>
                      </Grid2>
                      <Typography variant="body2" sx={{ mb: 1, flexGrow: 1 }}>
                        {product.content}
                      </Typography>
                      <Grid2
                        container
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: "line-through" }}
                        >
                          NT$ {product.origin_price}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="error"
                          fontWeight="bold"
                        >
                          NT$ {product.price}
                        </Typography>
                      </Grid2>
                      <Divider sx={{ my: 1 }} />
                      <Grid2 container spacing={1} sx={{ mt: 1 }}>
                        <Grid2 size={{ xs: 4 }}>
                          <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpen(true);
                            }}
                          >
                            查看更多
                          </Button>
                        </Grid2>
                        <Grid2 size={{ xs: 4 }}>
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleShareProduct(product.id, product.title)
                            }
                          >
                            分享至聊天室
                          </Button>
                        </Grid2>
                        <Grid2 size={{ xs: 4 }}>
                          <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => handleAddToCart(product, 1)}
                          >
                            加入購物車
                          </Button>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>

            <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={pagination.total_pages || 1}
                page={pagination.current_page || 1}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Grid2>

            <ProductModal
              open={open}
              onClose={() => setOpen(false)}
              product={selectedProduct}
              onAddToCart={handleAddToCart}
            />
          </>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
};

export default Products;
