import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import Grid2 from "@mui/material/Grid2"; //新版改Gridv2
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./components/CartModal";
import { deleteCartItem } from "./api/CustomerAPI";
import { getCart } from "./api/CustomerAPI";

const navItems = [
  { text: "產品", to: "/products" },
  { text: "關於我們", to: "/about-us" },
  { text: "聯絡我們", to: "/contact-us" },
];

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartCount = cartItems.length;
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // 每次路由變化時檢查登入狀態
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsCustomerLoggedIn(!!token);
  }, [location]);
  // 初始載入時取得購物車資料
  useEffect(() => {
    fetchCart();
  }, []);
  // 開啟購物車 Modal 時取得購物車資料
  useEffect(() => {
    if (cartOpen) {
      fetchCart();
    }
  }, [cartOpen]);
  //檢查登入狀態
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsCustomerLoggedIn(!!token);
  }, []);

  const fetchCart = async () => {
    const res = await getCart();
    if (res.success) {
      setCartItems(res.carts);
      setTotalPrice(res.final_total);
    } else {
      setCartItems([]); // 預防錯誤狀況
      setTotalPrice(0);
    }
  };

  const handleCheckout = () => {
    // 導向結帳頁面，依專案路由調整
    window.location.href = "/checkout";
  };

  //刪除購物車產品
  const handleRemoveItem = async (id) => {
    const result = await deleteCartItem(id);
    if (result.success) {
      await fetchCart(); // 刪除成功後直接重新撈購物車
    } else {
      alert(result.message);
    }
  };
  //登出
  const handleCustomerLogout = () => {
    localStorage.removeItem("token");
    setIsCustomerLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#8B4513", padding: 0 }}
        >
          <Toolbar sx={{ minHeight: "48px", padding: 0 }}>
            <Grid2 container sx={{ alignItems: "center", width: "100%" }}>
              {/* 左側標題 */}
              <Grid2 size={6}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    backgroundColor: "#8B4513",
                    color: "#FFFFFF",
                    "&:hover": {
                      transform: "none",
                      textDecoration: "none",
                      cursor: "pointer",
                    },
                  }}
                >
                  好喝茶飲
                </Button>
              </Grid2>

              {/* 右側按鈕或漢堡選單 */}
              <Grid2
                size={6}
                container
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
              >
                {isMobile ? (
                  <>
                    {/* 手機版：只顯示漢堡選單按鈕和購物車按鈕 */}
                    <IconButton
                      color="inherit"
                      onClick={toggleDrawer(true)}
                      edge="end"
                      size="large"
                      aria-label="open drawer"
                      sx={{ mr: 1 }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Drawer
                      anchor="right"
                      open={drawerOpen}
                      onClose={toggleDrawer(false)}
                      PaperProps={{
                        sx: {
                          width: "100%",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          bgcolor: "#8B4513",
                          height: "100%",
                          paddingTop: 3,
                        }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                      >
                        <List>
                          {navItems.map(({ text, to }) => (
                            <ListItem key={text} disablePadding>
                              <ListItemButton
                                component={Link}
                                to={to}
                                sx={{
                                  color: "#fff",
                                  textTransform: "none",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                <ListItemText primary={text} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                          {/* Drawer 內的登入/登出按鈕 */}
                          <ListItem disablePadding>
                            <ListItemButton
                              component={Link}
                              to="/login"
                              onClick={() => setDrawerOpen(false)}
                              sx={{
                                color: "#fff",
                                textTransform: "none",
                                fontSize: "1.2rem",
                                textAlign: "center",
                              }}
                            >
                              <ListItemText primary="登入" />
                            </ListItemButton>
                          </ListItem>
                          {/* 手機版前台會員登入/登出按鈕 */}
                          <ListItem disablePadding>
                            {isCustomerLoggedIn ? (
                              <ListItemButton
                                onClick={handleCustomerLogout}
                                sx={{
                                  color: "#fff",
                                  textTransform: "none",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                <ListItemText primary="登出" />
                              </ListItemButton>
                            ) : (
                              <ListItemButton
                                component={Link}
                                to="/liff-login"
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                  color: "#fff",
                                  textTransform: "none",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                <ListItemText primary="會員登入" />
                              </ListItemButton>
                            )}
                          </ListItem>
                          <ListItem>
                            <ListItemButton
                              onClick={() => setCartOpen(true)}
                              sx={{
                                justifyContent: "center", // 水平置中內容
                              }}
                            >
                              {/* 手機版購物車按鈕 */}
                              <IconButton
                                color="inherit"
                                size="large"
                                aria-label="open shopping cart"
                                sx={{
                                  ml: 1,
                                  padding: 1.5,
                                }}
                              >
                                <Badge
                                  badgeContent={cartCount}
                                  color="error"
                                  max={99}
                                >
                                  <ShoppingCartIcon />
                                </Badge>
                              </IconButton>
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </Box>
                    </Drawer>
                  </>
                ) : (
                  <>
                    {/* 桌面版 navItems */}
                    {navItems.map(({ text, to }) => (
                      <Button
                        key={text}
                        color="inherit"
                        component={Link}
                        to={to}
                        sx={{
                          backgroundColor: "#8B4513",
                          padding: "8px 16px",
                          color: "#FFFFFF",
                          textTransform: "none",
                          "&:hover": {
                            transform: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            textDecoration: "none",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {text}
                      </Button>
                    ))}
                    {/* 桌面版登入/登出按鈕 */}
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      sx={{
                        backgroundColor: "#8B4513",
                        padding: "8px 16px",
                        color: "#FFFFFF",
                        textTransform: "none",
                        "&:hover": {
                          transform: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          textDecoration: "none",
                          cursor: "pointer",
                        },
                      }}
                    >
                      登入
                    </Button>
                    {/* 桌面版前台會員登入/登出按鈕 */}
                    {isCustomerLoggedIn ? (
                      <Button
                        color="inherit"
                        onClick={handleCustomerLogout}
                        sx={{
                          backgroundColor: "#8B4513",
                          padding: "8px 16px",
                          color: "#FFFFFF",
                          textTransform: "none",
                          "&:hover": {
                            transform: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            textDecoration: "none",
                            cursor: "pointer",
                          },
                        }}
                      >
                        登出
                      </Button>
                    ) : (
                      <Button
                        color="inherit"
                        component={Link}
                        to="/liff-login"
                        sx={{
                          backgroundColor: "#8B4513",
                          padding: "8px 16px",
                          color: "#FFFFFF",
                          textTransform: "none",
                          "&:hover": {
                            transform: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            textDecoration: "none",
                            cursor: "pointer",
                          },
                        }}
                      >
                        會員登入
                      </Button>
                    )}
                    {/* 桌面版購物車按鈕 */}
                    <IconButton
                      color="inherit"
                      onClick={() => setCartOpen(true)}
                      size="large"
                      aria-label="open shopping cart"
                      sx={{ ml: 1 }}
                    >
                      <Badge badgeContent={cartCount} color="error" max={99}>
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </>
                )}
              </Grid2>
            </Grid2>
          </Toolbar>
        </AppBar>

        {/* 主內容 */}
        <Box component="main" sx={{ flexGrow: 1, paddingTop: "64px" }}>
          <Outlet
            context={{
              cartItems,
              totalPrice,
              onRemoveItem: handleRemoveItem,
              fetchCart,
            }}
          />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ p: 2, backgroundColor: "#333333", textAlign: "center" }}
        >
          <Typography variant="body1" sx={{ color: "#fff" }}>
            著作 © 2025
          </Typography>
        </Box>
      </Box>

      {/* 購物車 Modal */}
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default Layout;
