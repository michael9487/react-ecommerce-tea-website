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

        if (!liff.isLoggedIn()) {
          // 導去 LINE 登入，回來會自動執行以下邏輯
          liff.login({ redirectUri: window.location.href });
          return;
        }

        const idToken = liff.getIDToken();
        const profile = await liff.getProfile();

        localStorage.setItem("line_profile", JSON.stringify(profile));

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/liff-login`,
          { idToken }
        );

        localStorage.setItem("app_token", res.data.token);
        setIsCustomerLoggedIn(true);
        console.log("登入成功", res.data);

        const redirectPath = localStorage.getItem("afterLoginRedirect");
        localStorage.removeItem("afterLoginRedirect");

        if (redirectPath && redirectPath.startsWith("http")) {
          // 用原生跳轉保留 hash，避免 useNavigate 導致 hash 消失
          setTimeout(() => {
            window.location.href = redirectPath;
          }, 100);
        } else {
          navigate(redirectPath || "/member");
        }
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
