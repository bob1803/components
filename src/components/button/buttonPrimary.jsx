import React from "react";
import { Link } from "react-router-dom";
import "./buttonPrimary.less";

export default class ButtonPrimary extends React.Component {
  render() {
    return (
      <Link to={this.props.link}>
        <button className="btn-primary__container">
          {this.props.children}
        </button>
      </Link>
    );
  }
}
