import React from "react";
import "./home.less";
import ButtonText from "../buttonText/buttonText";
import { ConfigBtnBlueM } from "../../styles/vars";
import LinkSmall from "../link/linkSmall";
import LinkLarge from "../link/linkLarge";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ButtonText config={ConfigBtnBlueM}></ButtonText>
        <LinkSmall link="/about">I'm Link! Go to About!</LinkSmall>
        <LinkLarge link="/blog">I'M Link too! Go to Blog</LinkLarge>
       <div>HOME</div> 
      </div>
    );
  }
}
