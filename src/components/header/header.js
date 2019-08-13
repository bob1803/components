import * as React from "react";
import "./header.less";

export default class Header extends React.Component {
  render() {
    return <div className="header__container">


    {this.props.children}</div>;
  }
}
