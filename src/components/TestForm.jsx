import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Paper, Stack } from "@mui/material";

export default function ContactForm() {
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
                helperText={fieldState.error ? fieldState.error.message : ""}
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
                value: /^((09[1-9]\d{7})|(0[2-8]\d{1,2}[-\s]?\d{6,8}))$/,
                message: "電話格式不正確",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="電話"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
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
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "信箱格式不正確",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="信箱"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
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
                helperText={fieldState.error ? fieldState.error.message : ""}
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
  );
}
