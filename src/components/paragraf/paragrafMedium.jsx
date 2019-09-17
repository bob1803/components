import React from "react";
import "./paragrafMedium.less";

export default class ParagrafMedium extends React.Component {
  render() {
    return (
        <p className="paragraf-medium">{this.props.children}</p>
    );
  }
}
