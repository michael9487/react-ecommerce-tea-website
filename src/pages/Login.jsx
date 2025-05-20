import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // 用於導向
import { signin } from "../api/AuthAPI";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState(""); // 新增 API 錯誤訊息
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) tempErrors.email = "請輸入電子郵件";
    else if (!emailRegex.test(email)) tempErrors.email = "電子郵件格式不正確";

    if (!password) tempErrors.password = "請輸入密碼";
    else if (password.length < 6) tempErrors.password = "密碼至少6個字元";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (validate()) {
      setLoading(true);
      try {
        const res = await signin(email, password);
        if (res.data.success) {
          // 儲存 token（可用 localStorage 或 sessionStorage）
          localStorage.setItem("admin_token", res.data.token);
          setIsLoggedIn(true);
          // 導向後台的首頁
          navigate("/admin");
        } else {
          setApiError(res.data.message || "登入失敗");
        }
      } catch (err) {
        setApiError("伺服器錯誤，請稍後再試");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#C0C0C0",
      }}
    >
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid2
            size={{ xs: 12 }}
            component={Paper}
            elevation={6}
            square
            sx={{ p: 4, borderRadius: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" fontWeight="bold">
                登入
              </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="電子郵件"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              {apiError && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {apiError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
                disabled={loading}
              >
                {loading ? "登入中..." : "登入"}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
