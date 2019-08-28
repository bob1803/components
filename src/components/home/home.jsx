import React from "react";
import "./home.less";
import ButtonText from "../buttonText/buttonText";
import {ConfigBtnBlueM} from "../../styles/vars";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ButtonText
          config={ConfigBtnBlueM}
        ></ButtonText>
        HOME
      </div>
    );
  }
}
