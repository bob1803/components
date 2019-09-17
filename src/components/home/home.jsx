import React from "react";
import "./home.less";
import Services from "../services/services";
import LinkSmall from "../link/linkSmall";
import LinkLarge from "../link/linkLarge";
import ButtonPrimary from "../button/buttonPrimary";
import ButtonSecondary from "../button/buttonSecondary";
import ParagrafMedium from "../paragraf/paragrafMedium";
import DescriptionImg from "../descriptionImg/descriptionImg";
import DescriptionWithBgImage from "../descriptionWithBgImage/descriptionWithBgImage";
import imgDescriptionImg from "../../images/imgUpload/img_test_2.jpg";
import imgDescriptionWithBgImg from "../../images/imgUpload/img_test_1.jpg";


import Temp from "../temp/temp";
const descriptionImgConfig = {
text: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire.",
button: {
  text: "View More",
  link: "/about"
},
img: imgDescriptionImg
}

const descriptionWithBgImgConfig = {
  text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  button: {
    text: "View More",
    link: "/about"
  },
  img: imgDescriptionWithBgImg
  }

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Services></Services>
        <DescriptionImg config={descriptionImgConfig}></DescriptionImg>
        <DescriptionWithBgImage config={descriptionWithBgImgConfig}></DescriptionWithBgImage>
        <div>HOME</div>
        <LinkSmall link="/about">I'm Link! Go to About!</LinkSmall>
        <ButtonPrimary link="/about">Go to About</ButtonPrimary>
        <LinkLarge link="/blog">I'M Link too! Go to Blog</LinkLarge>
        <ButtonSecondary link="/contact">Go to Contact</ButtonSecondary>
        <ParagrafMedium></ParagrafMedium>
      </div>
    );
  }
}
