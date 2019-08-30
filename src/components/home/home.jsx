import React from "react";
import "./home.less";
import ButtonText from "../buttonText/buttonText";
import { ConfigBtnBlueM, linkSmallCnf } from "../../styles/vars";
import LinkSmall from "../link/linkSmall";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ButtonText config={ConfigBtnBlueM}></ButtonText>
        <LinkSmall
          config={linkSmallCnf}
        ></LinkSmall>
        HOME
      </div>
    );
  }
}
