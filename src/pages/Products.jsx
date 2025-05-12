import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // MUI 6 正式 Grid2

const apiPath = "https://vue-course-api.hexschool.io";
const customPath = "supercurry";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*撈資料*/
  const fetchProducts = async (currentPage) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${apiPath}/api/${customPath}/products`);
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
    fetchProducts(page);
  }, [page]);

  /* skeleton骨架屏 */
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
              sx={{ height: 200, borderRadius: 2, mb: 2, width: "100%" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width="80%" height={24} animation="wave" />
              </Typography>
              <Typography color="text.secondary" fontWeight="bold">
                <Skeleton width="60%" height={20} animation="wave" />
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );

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
            {/* 產品卡片 */}
            <Grid2 container spacing={3}>
              {products.map((product) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <Card sx={{ height: "100%" }}>
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
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Grid2>
                          <Typography variant="h6" noWrap>
                            {product.title}
                          </Typography>
                        </Grid2>
                        <Grid2>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{
                              backgroundColor: "#e0e0e0",
                              border: "1px solid #bdbdbd",
                              borderRadius: 1,
                              px: 1,
                              py: 0.3,
                              fontSize: "0.75rem",
                              fontWeight: "medium",
                              color: "text.secondary",
                              display: "inline-block",
                              maxWidth: 120,
                              textAlign: "center",
                            }}
                          >
                            {product.category}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, flexGrow: 1 }}
                      >
                        {product.content}
                      </Typography>
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Grid2>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            NT$ {product.origin_price}
                          </Typography>
                        </Grid2>
                        <Grid2>
                          <Typography
                            variant="body1"
                            color="error"
                            fontWeight="bold"
                          >
                            NT$ {product.price}
                          </Typography>
                        </Grid2>
                      </Grid2>
                      <Divider sx={{ my: 1, bgcolor: "grey.300" }} />
                      <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Button size="small" variant="text" color="primary">
                          查看更多
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          加入購物車
                        </Button>
                      </Grid2>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
            {/* 分頁標籤 */}
            <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={pagination.total_pages || 1}
                page={pagination.current_page || 1}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Grid2>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;
