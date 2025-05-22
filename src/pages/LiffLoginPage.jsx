import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import liff from "@line/liff";

const LiffLoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "你的 LIFF ID" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const idToken = liff.getIDToken();

        const res = await axios.post("你的後端登入 API，例如 /api/liff-login", {
          idToken,
        });

        if (res.data.success) {
          localStorage.setItem("app_token", res.data.token);
          localStorage.setItem("uid", res.data.uid);

          const redirectUrl = localStorage.getItem("afterLoginRedirect") || "/";
          localStorage.removeItem("afterLoginRedirect");

          // 若登入前欲分享商品，導回 /products，自動觸發分享邏輯
          const waitingToShare = sessionStorage.getItem("waitingToShare");
          if (waitingToShare) {
            navigate("/products");
          } else {
            navigate(redirectUrl);
          }
        } else {
          alert("登入失敗：" + (res.data.message || "未知錯誤"));
          navigate("/");
        }
      } catch (error) {
        console.error("LIFF 初始化或登入失敗", error);
        alert("LIFF 登入失敗，請稍後再試");
        navigate("/");
      }
    };

    initLiff();
  }, [navigate]);

  return (
    <p style={{ padding: "2rem", textAlign: "center" }}>登入中，請稍候...</p>
  );
};

export default LiffLoginPage;
