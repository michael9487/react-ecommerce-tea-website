import React, { createContext, useContext, useState, useEffect } from "react";
import { checkLogin } from "../api/AuthAPI";

const AuthContext = createContext(null);

// 自訂 Hook，方便其他元件使用
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 頁面載入時檢查登入狀態
  useEffect(() => {
    const verifyLogin = async () => {
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
    };
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
