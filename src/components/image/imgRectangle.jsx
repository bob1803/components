import React from "react";
import "./imgRectangle.less";

export default class ImgRectangle extends React.Component {
  constructor(props) {
    super(props);
    this._borderRadius = this.props.options.borderRadius || 0;
    this._altText = this.props.options.altText || "image";
  }

  render() {
    return (
      <div className="img-rectangle__container">
        <img
          className="img-rectangle"
          width="auto"
          height="auto"
          style={{ borderRadius: this._borderRadius }}
          src={this.props.options.src}
          alt={this._altText}
        ></img>
      </div>
    );
  }
}
