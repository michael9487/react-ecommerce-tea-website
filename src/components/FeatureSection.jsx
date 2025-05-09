import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

const features = [
  {
    icon: <LooksOneIcon sx={{ fontSize: 40, mb: 1, color: "#fff" }} />,
    title: "嚴選原料",
    description:
      "影響高級茶葉的因素有：採摘不宜、氣候不穩定、下雨、露水太重等因素。唯有在天時、地利、人和的充分配合之下，才能製造出高品質的茶葉。",
  },
  {
    icon: <LooksTwoIcon sx={{ fontSize: 40, mb: 1, color: "#fff" }} />,
    title: "獨家製程",
    description:
      "新式的製茶過程，是用機械來代替人工不足，節省不少時間，浪菁時用機械動力攪拌；炒菁時，更不用大費周章，瓦斯殺菁機快又能保持新鮮青翠，現在的製茶技術以到達一定水準。",
  },
  {
    icon: <Looks3Icon sx={{ fontSize: 40, mb: 1, color: "#fff" }} />,
    title: "愉悅心情",
    description: "消除一整日的疲勞壓力。",
  },
  {
    icon: <Looks4Icon sx={{ fontSize: 40, mb: 1, color: "#fff" }} />,
    title: "舒適環境",
    description: "我們提供完善的用餐環境，讓您安心享用每一份餐點。",
  },
];

function FeatureSection() {
  return (
    <>
      {/* 四大特色 */}
      <Box
        sx={{
          width: "100%", // 滿寬
          position: "relative", // 可視需求加上定位
          bgcolor: "#73b839", // 或你想要的背景色
          py: 8, // 上下內距
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {/* 主標題 */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="#fff"
          >
            四大特色
          </Typography>
          {/* 2x2 Grid2 這裡注意使用gap則有些排版不會吃到 這邊改成spacing */}
          <Grid2 container spacing={3} flexWrap="wrap">
            {features.map(({ icon, title, description }, index) => (
              <Grid2
                key={index}
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }} // 水平置中
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    px: 2,
                    maxWidth: 400, // 限制最大寬度，避免太寬
                    width: "100%",
                  }}
                >
                  {icon}
                  <Typography variant="h6" gutterBottom color="#fff">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    {description}
                  </Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </>
  );
}
export default FeatureSection;
