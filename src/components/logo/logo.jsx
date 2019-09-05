import React from "react";
import { Link } from "react-router-dom";
import "./logo.less";

export default class Logo extends React.Component {
  constructor(props) {
    super(props);
   
  }
  render() {
    return (
      <div className="logo__container">
        <Link to="/">
          <div className="logo">CONSTRUCTOR</div>
        </Link>
      </div>
    );
  }
}
