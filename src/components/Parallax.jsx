import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParallaxImage from "../assets/img/parallax.jpg"; // 請替換為你的背景圖路徑

export default function ParallaxSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: 500,
        backgroundImage: `url(${ParallaxImage})`,
        backgroundAttachment: "fixed", // 視差滾動關鍵
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "red",
        }}
        onClick={() => navigate("/products")}
      >
        心動下單
      </Button>
    </Box>
  );
}
