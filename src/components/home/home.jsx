import React from "react";
import "./home.less";
//import ButtonText from "../buttonText/buttonText";
import { ConfigBtnBlueM } from "../../styles/vars";
import LinkSmall from "../link/linkSmall";
import LinkLarge from "../link/linkLarge";
import ButtonPrimary from "../button/buttonPrimary";
import ButtonSecondary from "../button/buttonSecondary";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <LinkSmall link="/about">I'm Link! Go to About!</LinkSmall>
        <ButtonPrimary link="/about">Go to About</ButtonPrimary>
        <LinkLarge link="/blog">I'M Link too! Go to Blog</LinkLarge>
        <ButtonSecondary link="/contact">Go to About</ButtonSecondary>
        <div>HOME</div>
      </div>
    );
  }
}
