import React from "react";
import { Link } from "react-router-dom";
import "./linkSmall.less";

export default class LinkSmall extends React.Component {
  constructor(props) {
    super(props);
    this._color = this.props.color || "primary"
  }

  render() {
    return (
      <Link to={this.props.link}>
        <span className={`link-small link-small__${this._color}`} >{this.props.children}</span>
      </Link>
    );
  }
}
