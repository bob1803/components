import React from "react";
import "./imgSquare.less";
import ReactResizeDetector from "react-resize-detector";

export default class ImgSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgSize: null };
    this._borderRadius = this.props.options.borderRadius || 0;
    this._minSize = this.props.options.minSize || 0;
    this._altText = this.props.options.altText || "image";
  }

  _resize = (width, height) => {
    let minSize = width <= height ? `${width}px` : `${height}px`;
    this.setState({ imgSize: minSize });
  };

  render() {
    console.log(this._altText);
    return (
      <div className="img-square__container"
      style={{
          minWidth: this._minSize,
          minHeight: this._minSize
      }}>
        <ReactResizeDetector handleWidth handleHeight onResize={this._resize} />
        <img
          className="img-square"
          width={this.state.imgSize}
          height={this.state.imgSize}
          style={{ borderRadius: this._borderRadius }}
          src={this.props.options.src}
          alt={this._altText}
        ></img>
      </div>
    );
  }
}
