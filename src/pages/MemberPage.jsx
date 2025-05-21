import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const MemberPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const { isCustomerLoggedIn, setIsCustomerLoggedIn } = useAuth();

  useEffect(() => {
    const lineProfile = localStorage.getItem("line_profile");
    const appToken = localStorage.getItem("app_token");

    if (!lineProfile || !appToken) {
      navigate("/liff-login");
      return;
    }

    // 若 Context 中尚未設定登入狀態，補上
    if (!isCustomerLoggedIn) {
      setIsCustomerLoggedIn(true);
    }

    setProfile(JSON.parse(lineProfile));
  }, [navigate, isCustomerLoggedIn, setIsCustomerLoggedIn]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div style={{ padding: "2rem" }}>
        <h2>會員中心</h2>
        {profile ? (
          <>
            <img
              src={profile.pictureUrl}
              alt="頭像"
              style={{ width: 200, borderRadius: "50%" }}
            />
            <p>{profile.displayName}</p>
          </>
        ) : (
          <p>載入中...</p>
        )}
      </div>
    </Box>
  );
};

export default MemberPage;
