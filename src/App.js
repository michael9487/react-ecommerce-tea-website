import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
//前台
import Home from "./pages/Home";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import TestForm from "./components/TestForm";
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
            <Route path="/test-form" element={<TestForm />} />
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
