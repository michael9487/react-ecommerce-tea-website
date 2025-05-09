import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
//前台
import Home from "./routes/Home";
import Products from "./routes/Products";
import AboutUs from "./routes/AboutUs";
import ContactUs from "./routes/ContactUs";
import Login from "./Login";
//後台
import AdminHome from "./admin/AdminHome";
import AdminProductList from "./admin/AdminProductList";
import AdminOrderList from "./admin/AdminOrderList";

function App() {
  return (
    <Router basename="/">
      <Layout>
        <div>
          {/* 路由設定 */}
          <Routes>
            {/* 前台路由 */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            {/* 後台路由 */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/product-list" element={<AdminProductList />} />
            <Route path="/admin/order-list" element={<AdminOrderList />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
