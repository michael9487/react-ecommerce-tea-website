import { useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LiffLoginPage = () => {
  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  useEffect(() => {
    const loginWithLine = async () => {
      try {
        await liff.init({ liffId: "2007351182-5y4kv6bg" });

        // 如果還沒登入，就先導去 LINE 登入頁
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        // 登入成功後回來才會執行以下邏輯
        const idToken = liff.getIDToken();
        console.log("拿到的 idToken 是:", idToken); // 應該會看到這行
        const profile = await liff.getProfile();

        localStorage.setItem("line_profile", JSON.stringify(profile));

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/liff-login`,
          { idToken }
        );

        localStorage.setItem("app_token", res.data.token);
        setIsCustomerLoggedIn(true);
        console.log("登入成功", res.data);
        navigate("/member");
      } catch (error) {
        console.error("登入失敗:", error);
      }
    };

    loginWithLine();
  }, [navigate, setIsCustomerLoggedIn]);
  return (
    <div style={{ padding: "2rem" }}>
      <p>正在登入中，請稍候...</p>
    </div>
  );
};

export default LiffLoginPage;
