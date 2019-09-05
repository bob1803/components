import React from "react";
import { Link } from "react-router-dom";
import "./buttonSecondary.less";

export default class ButtonSecondary extends React.Component {
  render() {
    return (
      <Link to={this.props.link}>
        <button className="btn-secondary__container">
          {this.props.children}
        </button>
      </Link>
    );
  }
}
