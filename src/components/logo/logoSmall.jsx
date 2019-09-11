import React from "react";
import { Link } from "react-router-dom";
import "./logoSmall.less";

export default class LogoSmall extends React.Component {
  constructor(props) {
    super(props);
   
  }
  render() {
    return (
      <div className="logo-small__container">
        <Link to="/">
          <div className="logo-small">CONSTRUCTOR</div>
        </Link>
      </div>
    );
  }
}
