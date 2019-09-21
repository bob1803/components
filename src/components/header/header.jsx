import * as React from "react";
import "./header.less";
import LogoMedium from "../logo/logoMedium";
import Menu from "../menu/menu";
import LinkLarge from "../link/linkLarge";
import { configMenu } from "../../config";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header__container">
        <div className="header__wrap-content">
          <div className="header__wrap-left">
            <div className="header__logo-container">
              <LogoMedium></LogoMedium>
            </div>
          </div>
          <div className="header__wrap-right">
            <div className="header__menu-container">
              <Menu minWidth={900} config={configMenu}></Menu>
            </div>
            <div className="header__link-container">
              <LinkLarge className="header__link" link="/about">
                Link about
              </LinkLarge>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
