import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // 藍色
    },
    secondary: {
      main: "#9c27b0", // 紫色
    },
    background: {
      default: "#f5f5f5", // 淺灰背景
      paper: "#ffffff", // 白色卡片背景
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
});

export default theme;
