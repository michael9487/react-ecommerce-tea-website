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

      // 👉 檢查前台 app token 是否存在（你可以自己擴充 /verify 或直接用 token 判斷）
      const appToken = localStorage.getItem("app_token");
      if (appToken) {
        setIsCustomerLoggedIn(true);
      } else {
        setIsCustomerLoggedIn(false);
      }
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
