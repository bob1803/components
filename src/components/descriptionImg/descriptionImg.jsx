import React from "react";
import ParagrafMedium from "../paragraf/paragrafMedium";
import ButtonSecondary from "../button/buttonSecondary";
import ImgRectangle from "../image/imgRectangle";
import "./descriptionImg.less";

export default class DescriptionImg extends React.Component {
  render() {
    return (
      <div className="description-img__container">
        <div className="description-img__wrap-content">
          <div className="description-img__text-container">
            <div className="description-img__text">
              <ParagrafMedium>{this.props.config.text}</ParagrafMedium>
            </div>
            <div className="description-img__button">
              <ButtonSecondary link={this.props.config.button.link}>
                {this.props.config.button.text}
              </ButtonSecondary>
            </div>
          </div>
          <div className="description-img__img-container">
            <ImgRectangle
              options={{
                src: this.props.config.img
              }}
            ></ImgRectangle>
          </div>
        </div>
      </div>
    );
  }
}
