// src/pages/LiffLoginPage.jsx
import { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";

const LiffLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lineProfile, setLineProfile] = useState(null);
  const [appToken, setAppToken] = useState(null);

  useEffect(() => {
    // 初始化 LIFF
    liff
      .init({ liffId: "2007351182-5y4kv6bg" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login(); // 自動導向 LINE 登入
        } else {
          setIsLoggedIn(true);
          handleLogin(); // 如果已登入，開始後端驗證流程
        }
      })
      .catch((err) => {
        console.error("LIFF 初始化失敗:", err);
      });
  }, []);

  const handleLogin = async () => {
    try {
      const idToken = liff.getIDToken(); // 拿到 LINE 給的 idToken
      const profile = await liff.getProfile();
      setLineProfile(profile);

      // 呼叫後端 API 驗證 idToken
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/verify`, {
        idToken,
      });

      setAppToken(res.data.token);
      localStorage.setItem("app_token", res.data.token); // 儲存你的網站用的 JWT
      console.log("登入成功", res.data);
    } catch (error) {
      console.error("登入失敗:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>LINE LIFF 登入</h2>
      {isLoggedIn ? (
        <>
          <p>LINE 使用者名稱：{lineProfile?.displayName}</p>
          <p>網站 JWT：{appToken}</p>
        </>
      ) : (
        <p>登入中...</p>
      )}
    </div>
  );
};

export default LiffLoginPage;
