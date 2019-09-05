import React from "react";
import { Link } from "react-router-dom";
import "./linkSmall.less";

export default class LinkSmall extends React.Component {
  render() {
    return (
      <Link to={this.props.link}>
        <a className="link-small">{this.props.children}</a>
      </Link>
    );
  }
}
