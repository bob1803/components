import React from "react";
import { Link } from "react-router-dom";
import "./logoMedium.less";

export default class LogoMedium extends React.Component {
  constructor(props) {
    super(props);
   
  }
  render() {
    return (
      <div className="logo-medium__container">
        <Link to="/">
          <div className="logo-medium">CONSTRUCTOR</div>
        </Link>
      </div>
    );
  }
}
