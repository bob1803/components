import React from "react";
import { Link } from "react-router-dom";
//import { ConfigLogo } from "../../styles/vars";
//import Radium from "radium";

//@Radium
export default class Logo extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.styles = {
      display: "inline-block",
      color: ConfigLogo.colorLogo,
      padding: ConfigLogo.padding,
      fontWeight: ConfigLogo.fontWeight,
      ':hover': {
        color: ConfigLogo.colorLogoHover
      }
    };
    */
  }
  render() {
    return (
      <div className="logo__container">
        <Link to="/">
          <div className="logo">LOGO</div>
        </Link>
      </div>
    );
  }
}
