import React from "react";
import "./paragrafMedium.less";

export default class ParagrafMedium extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="paragraf-medium__container">
        <p className="paragraf-medium">{this.props.text}</p>
      </div>
    );
  }
}
