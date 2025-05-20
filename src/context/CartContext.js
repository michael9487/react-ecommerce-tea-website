import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { addToCart as addToCartAPI } from "../api/CustomerAPI"; // 引入你的 API 函式

const api_name = "https://vue-course-api.hexschool.io";
const api_path = "supercurry";

export const CartContext = createContext();

const fetchCart = async () => {
  try {
    const res = await axios.get(`${api_name}/api/${api_path}/cart`);
    const data = res.data.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("取得購物車資料失敗", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const initCart = async () => {
      const data = await fetchCart();
      setCart(data);
    };
    initCart();
  }, []);

  const addToCart = async (product_id, qty) => {
    const res = await addToCartAPI(product_id, qty);
    if (res.success) {
      const updatedCart = await fetchCart();
      setCart(updatedCart);
      return { success: true, message: res.message };
    } else {
      return { success: false, message: res.message || "加入購物車失敗" };
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
