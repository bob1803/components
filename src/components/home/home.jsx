import React from "react";
import "./home.less";
import Services from "../services/services";
import LinkSmall from "../link/linkSmall";
import LinkLarge from "../link/linkLarge";
import ButtonPrimary from "../button/buttonPrimary";
import ButtonSecondary from "../button/buttonSecondary";
import ParagrafMedium from "../paragraf/paragrafMedium";
import Temp from "../temp/temp";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div>HOME</div>
        <Services></Services>
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
