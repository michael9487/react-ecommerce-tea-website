import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const MemberPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const lineProfile = localStorage.getItem("line_profile");
    const appToken = localStorage.getItem("app_token");

    if (!lineProfile || !appToken) {
      // 沒有登入 → 導回登入頁
      navigate("/liff-login");
      return;
    }

    setProfile(JSON.parse(lineProfile));
  }, [navigate]);

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
              style={{ width: 100, borderRadius: "50%" }}
            />
            <p>LINE 名稱：{profile.displayName}</p>
          </>
        ) : (
          <p>載入中...</p>
        )}
      </div>
    </Box>
  );
};

export default MemberPage;
