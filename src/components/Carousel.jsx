import React, { useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/img/banner1.jpg";
import banner2 from "../assets/img/banner2.jpg";
import banner3 from "../assets/img/banner3.jpg";

const slides = [
  {
    img: banner1,
    title: "新品上市",
    description: "探索最新單品，搶先品嚐好滋味。",
    buttonText: "立即購買",
    buttonLink: "/products",
  },
  {
    img: banner2,
    title: "限時折扣 5 折起",
    description: "精選商品限時優惠，錯過不再。",
    buttonText: "查看優惠",
    buttonLink: "/products",
  },
  {
    img: banner3,
    title: "會員專屬禮遇",
    description: "加入會員，享受更多專屬福利。",
    buttonText: "加入會員",
    buttonLink: "/products",
  },
];

function Carousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.swiper
    ) {
      const swiper = swiperRef.current.swiper;

      // 加上 swiper.navigation 判斷
      if (swiper.navigation) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);
  return (
    <>
      {/* 輪播 */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          height: 700,
        }}
      >
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: null,
            nextEl: null,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        >
          {slides.map(
            ({ img, title, description, buttonText, buttonLink }, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/*文字遮罩 */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "20%",
                      height: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      color: "#fff",
                      p: 4,
                      maxWidth: { xs: "90%", md: "40%" },
                      paddingLeft: "80px", // 文字往右移
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="h2"
                      gutterBottom
                      sx={{ fontSize: { xs: "1.8rem", md: "3rem" } }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={buttonLink}
                      sx={{ textTransform: "none" }}
                    >
                      {buttonText}
                    </Button>
                  </Box>
                </Box>
              </SwiperSlide>
            )
          )}
          {/* 自訂左右箭頭 */}
          <Box
            ref={prevRef}
            sx={{
              position: "absolute",
              top: "50%",
              left: 20,
              zIndex: 10,
              width: 40,
              height: 40,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transform: "translateY(-50%)",
              "& svg": {
                fill: "#fff",
                width: 20,
                height: 20,
              },
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            {/* 左箭頭 SVG */}
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </Box>

          <Box
            ref={nextRef}
            sx={{
              position: "absolute",
              top: "50%",
              right: 20,
              zIndex: 10,
              width: 40,
              height: 40,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transform: "translateY(-50%)",
              "& svg": {
                fill: "#fff",
                width: 20,
                height: 20,
              },
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            {/* 右箭頭 SVG */}
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </Box>
        </Swiper>
      </Box>
    </>
  );
}
export default Carousel;
