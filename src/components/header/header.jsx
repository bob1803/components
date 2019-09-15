import * as React from "react";
import "./header.less";
import LogoMedium from "../logo/logoMedium";
import Menu from "../menu/menu";
import LinkLarge from "../link/linkLarge";
import { configMenu } from "../../config";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header__container">
        <div className="header__wrap-left">
          <LogoMedium></LogoMedium>
        </div>
        <div className="header__wrap-right">
          <Menu minWidth={900} config={configMenu}></Menu>
          <LinkLarge className="header__link" link="/about">
            Link about
          </LinkLarge>
        </div>
      </div>
    );
  }
}
