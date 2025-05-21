import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
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
      bgcolor="#f9f9f9"
    >
      <Box
        p={4}
        borderRadius={4}
        boxShadow={3}
        bgcolor="#fff"
        textAlign="center"
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h4" gutterBottom>
          會員中心
        </Typography>

        {profile ? (
          <>
            <Avatar
              src={profile.pictureUrl}
              alt="頭像"
              sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
            />
            <Typography variant="h6">{profile.displayName}</Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default MemberPage;
