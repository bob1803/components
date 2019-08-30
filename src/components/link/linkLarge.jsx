import React from "react";
import { Link } from "react-router-dom";
import "./linkLarge.less";

export default class LinkLarge extends React.Component {
  render() {
    return (
      <Link to={this.props.link}>
        <span className="link-large">{this.props.children}</span>
      </Link>
    );
  }
}
