import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";

export default function ContactUs() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "onTouched", // 失焦後驗證
  });

  const onSubmit = (data) => {
    alert("送出成功！\n" + JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Box
        mx="auto"
        sx={{
          backgroundColor: "#C0C0C0",
          p: 4,
        }}
      >
        <Container>
          {/* 標題 */}
          <Typography variant="h3" align="center" gutterBottom>
            聯絡我們
          </Typography>
          {/* 聯絡資訊 */}
          <Stack spacing={2} mb={3}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <PhoneIcon color="primary" />
              <Typography variant="body1">電話:02-XXXXXXXXX</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <EmailIcon color="primary" />
              <Typography variant="body1">Email:xxx@gmail.com</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <FacebookIcon color="primary" />
              <Typography variant="body1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <InstagramIcon color="primary" />
              <Typography variant="body1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IG
                </a>
              </Typography>
            </Stack>
          </Stack>
          {/* Google 地圖 */}
          <Paper elevation={2} sx={{ mb: 3, width: "50%", mx: "auto" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3613.244166270442!2d121.52362207595775!3d25.09359483588817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5aOr5p6X5o236YGL56uZ!5e0!3m2!1szh-TW!2stw!4v1747013461926!5m2!1szh-TW!2stw"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="google-map"
            />
          </Paper>
          <Typography variant="h6" m={4} fontWeight="bold" textAlign="center">
            立即諮詢
          </Typography>
          {/* 聯絡表單 */}
          <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 6 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                {/* 姓名 */}
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "請輸入姓名",
                    pattern: {
                      value: /^[\u4e00-\u9fa5a-zA-Z\s]+$/,
                      message: "姓名只能包含中文、英文和空白",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="姓名"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 電話 */}
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "請輸入電話",
                    pattern: {
                      value: /^((09[0-9]{8})|(0[2-8]{1}[0-9]{7}))$/,
                      message: "電話格式不正確",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="電話"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 信箱 */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "請輸入信箱",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "信箱格式不正確",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="信箱"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 諮詢內容 */}
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: "請輸入諮詢內容",
                    maxLength: {
                      value: 500,
                      message: "內容不可超過 500 字元",
                    },
                    pattern: {
                      value:
                        /^[\u4e00-\u9fa5a-zA-Z0-9\s,.?!，。？！\-()（）'"“”《》【】…·]+$/,
                      message: "內容只能包含中英文、數字、空白與常用標點符號",
                    },
                    validate: (value) => {
                      if (value.trim() === "") {
                        return "請輸入諮詢內容";
                      }
                      if (/\s{2,}/.test(value)) {
                        return "內容不能有連續多個空白";
                      }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="想諮詢的話"
                      multiline
                      rows={4}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      fullWidth
                    />
                  )}
                />

                {/* 送出按鈕 */}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!formState.isValid}
                  size="large"
                >
                  送出
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
