import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const teamMembers = [
  {
    name: "王小明",
    role: "創辦人 / 茶藝師",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "李美麗",
    role: "產品經理",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "陳大華",
    role: "客服主管",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#C0C0C0",
          p: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom align="center">
            關於我們
          </Typography>
          <Box mb={6}>
            <Typography variant="h5" gutterBottom>
              品味一杯好茶，感受生活的美好
            </Typography>
            <Typography variant="body1" paragraph>
              茶韻坊成立於2015年，源自一群熱愛茶文化的朋友，致力於將台灣在地優質茶葉，帶給每一位懂得品味生活的你。我們相信，一杯好茶不僅是味蕾的享受，更是心靈的撫慰。
            </Typography>
            <Typography variant="h5" gutterBottom mt={4}>
              我們的使命
            </Typography>
            <Typography variant="body1" paragraph>
              在茶韻坊，我們堅持「純淨、自然、健康」的理念，嚴選來自台灣各大茶區的手工茶葉，從茶園到茶杯，每一步都用心把關，為你呈現最純粹的茶香與口感。
            </Typography>
            <Typography variant="h5" gutterBottom mt={4}>
              品質保證
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>嚴選茶葉：與小農合作，確保茶葉無農藥殘留，天然栽培。</li>
              <li>手工製茶：傳承百年製茶工藝，保留茶葉最原始的風味。</li>
              <li>新鮮包裝：採用真空包裝技術，鎖住茶葉鮮度與香氣。</li>
            </Typography>
          </Box>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h4" gutterBottom align="center">
            我們的團隊
          </Typography>
          <Grid2 container spacing={4} justifyContent="center">
            {teamMembers.map((member) => (
              <Grid2 key={member.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={3}
                  sx={{ p: 3, textAlign: "center", height: "100%" }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {member.role}
                  </Typography>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
          <Box mt={8} textAlign="center">
            <Typography variant="body1" gutterBottom>
              感謝每一位支持好喝茶飲的朋友，您的肯定讓我們持續努力，將更多優質茶品帶進你的生活。
            </Typography>
            <Typography variant="body1">
              聯絡我們：xxx@gmail.com ｜ 02-xxxx-xxxx
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
