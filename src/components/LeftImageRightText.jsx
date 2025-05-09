import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

export default function ImageTextSection({
  reverse = false,
  imgSrc,
  title,
  description,
  btnText,
  btnLink,
  children, // 用來放額外的 Grid2 container 內容
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        // 手機版：背景圖 + 文字重疊
        <Box
          sx={{
            position: "relative",
            height: 500,
            color: "#fff",
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                alignSelf: "start",
                color: "white",
                backgroundColor: "#73b839",
                mb: 2,
              }}
              href={btnLink}
            >
              {btnText}
            </Button>
            {children}
          </Box>
        </Box>
      ) : (
        // 桌面版：左右圖文，可反轉順序
        <Grid2
          container
          spacing={4}
          alignItems="center"
          sx={{
            height: 500,
            backgroundColor: "#d3d3d3",
            flexDirection: reverse ? "row-reverse" : "row",
          }}
        >
          <Grid2
            size={5}
            sx={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 2,
              height: "100%",
            }}
          />
          <Grid2 size={7}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 5,
              }}
            >
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  alignSelf: "start",
                  color: "white",
                  backgroundColor: "#73b839",
                  mb: 2,
                }}
                href={btnLink} // 使用 btnLink
              >
                {btnText}
              </Button>
              {children}
            </Box>
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
