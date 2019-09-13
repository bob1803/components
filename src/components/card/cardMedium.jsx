import React from "react";
import "./cardMedium.less";
import ImgRectangle from "../image/imgRectangle";
import ParagrafMedium from "../paragraf/paragrafMedium";

export default class CardMedium extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card-medium__container">
        <ImgRectangle
          options={{
            src: this.props.config.img
          }}
        ></ImgRectangle>
        <ParagrafMedium text={this.props.config.text}></ParagrafMedium>
      </div>
    );
  }
}
