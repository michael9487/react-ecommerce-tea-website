import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//前台
import Layout from "./Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import CheckAndPay from "./pages/CheckoutAndPay";
//後台
import AdminLayout from "./AdminLayout";
import AdminHome from "./admin/AdminHome";
import AdminProductList from "./admin/AdminProductList";
import AdminOrderList from "./admin/AdminOrderList";
import AdminCoupons from "./admin/AdminCoupons";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./components/DarkTheme";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset || document.documentElement.scrollTop;
    setVisible(offset > 300); // 超過 300px 才顯示按鈕
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="small"
        onClick={scrollToTop}
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

function App() {
  return (
    <Router basename="/">
      {/* 路由設定 */}
      <Routes>
        {/* 前台路由*/}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-pay/:orderId" element={<CheckAndPay />} />
        </Route>
        {/* 後台路由*/}
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <ThemeProvider theme={darkTheme}>
                <AdminLayout />
              </ThemeProvider>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="product-list" element={<AdminProductList />} />
          <Route path="order-list" element={<AdminOrderList />} />
          <Route path="coupons" element={<AdminCoupons />} />
        </Route>
      </Routes>
      <ScrollTopButton />
    </Router>
  );
}

export default App;
