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
        <div className="card-medium__wrap-shaddow">
          <div className="card-medium__img-container">
            <ImgRectangle
              options={{
                src: this.props.config.img
              }}
            ></ImgRectangle>
          </div>
          <div className="card-medium__text-container">
            <ParagrafMedium text={this.props.config.text}></ParagrafMedium>
          </div>
        </div>
      </div>
    );
  }
}
