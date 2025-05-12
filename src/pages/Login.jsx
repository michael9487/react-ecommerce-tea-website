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

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({ email: "", password: "" });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 這裡可接後端登入API
      alert(`登入成功\nEmail: ${email}\n密碼: ${password}`);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid2
            xs={12}
            sm={8}
            md={6}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: "bold" }}
              >
                登入
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
