import React from "react";
import FeatureSection from "../components/FeatureSection";
import CarouselSection from "../components/Carousel";
import LeftImageRightTextSection from "../components/LeftImageRightText";
import ParallaxSection from "../components/Parallax";
import LeftImg from "../assets/img/home-tea-left-image-right-text.jpg";
import RightImg from "../assets/img/home-tea-right-image-left-text.jpg";
import Grid2 from "@mui/material/Grid2";
import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <CarouselSection />
      <FeatureSection />
      <LeftImageRightTextSection
        reverse={false}
        imgSrc={LeftImg}
        title="歡迎來到茶的領域"
        description="茶，是指利用茶樹的葉子所加工製成的飲料，也可以加入食物中調味，也可入中藥使用。現代的茶按製作工序主要分爲六大類，綠茶、白茶、黃茶、青茶、紅茶、黑茶。"
        btnText="了解更多"
        btnLink="/about-us"
      >
        {/* 你可以把原本 Grid2 container 的內容放這裡作為 children */}
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <Typography variant="h6" gutterBottom>
              不同的茶文化
            </Typography>
            <Typography variant="body2">
              各個民族和地區之間發展出了不同的茶文化，比如工夫茶、茶道、下午茶等等。現今茶樹在世界各國廣泛種植，目前的產茶大國有中國、印度、肯亞、斯里蘭卡等國。
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="h6" gutterBottom>
              遍布全球的產地
            </Typography>
            <Typography variant="body2">
              世界五大茶葉進口國為英國、俄羅斯、巴基斯坦、美國和埃及，進口量占世界總進口量的60%左右。英國是非產茶國家，但茶葉進口量位居世界首位，全國77%的人有飲茶習慣；美國是茶葉傳統消費大國，德國、法國消費呈增長趨勢；埃及、巴基斯坦茶葉消費增長快速；俄羅斯歷來是茶葉消費大國。
            </Typography>
          </Grid2>
        </Grid2>
      </LeftImageRightTextSection>
      <ParallaxSection />
      <LeftImageRightTextSection
        reverse={true}
        imgSrc={RightImg}
        title="忘卻不了的茶香"
        description="已知茶葉中含有500多種化學成分，有機成分有四百五十多種，其中具有生理作用的有很多。"
        btnText="聯絡我們"
        btnLink="/contact-us"
      >
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <Typography variant="h6" gutterBottom>
              積沈在心中的漣漪
            </Typography>
            <Typography variant="body2">
              茶多酚，也稱鞣質，茶葉中有含量很高的各類多酚類化合物，從茶葉中提取出的多酚類化合物粗產物被稱為茶多酚。
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="h6" gutterBottom>
              放不下的體脂肪
            </Typography>
            <Typography variant="body2">
              茶葉中所含的葡萄糖、阿拉伯糖、核糖的複合糖、兒茶素與二苯胺等物質，可以減少血糖的來源，調節人體內血糖的平衡。
            </Typography>
          </Grid2>
        </Grid2>
      </LeftImageRightTextSection>
    </>
  );
}

export default Home;
