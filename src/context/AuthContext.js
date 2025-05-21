import React, { createContext, useContext, useState, useEffect } from "react";
import { checkLogin } from "../api/AuthAPI"; // 仍保留後台檢查

const AuthContext = createContext(null);

// 自訂 Hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 後台登入狀態
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false); // 前台登入狀態

  // 頁面載入時檢查後台 & 前台登入狀態
  useEffect(() => {
    const verifyLogin = async () => {
      // 檢查後台登入（透過 API）
      try {
        const res = await checkLogin();
        if (res.data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("admin_token");
        }
      } catch {
        setIsLoggedIn(false);
        localStorage.removeItem("admin_token");
      }

      // 檢查前台登入（只看 token）
      const customerToken = localStorage.getItem("token");
      setIsCustomerLoggedIn(!!customerToken);
    };

    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isCustomerLoggedIn,
        setIsCustomerLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
