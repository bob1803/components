import React from "react";
import ParagrafMedium from "../paragraf/paragrafMedium";
import ButtonPrimary from "../button/buttonPrimary";
import "./descriptionWithBgImage.less";

export default class DescriptionWithBgImage extends React.Component {
  render() {
    console.log(this.props.config.img);
    return (
      <div className="description-with-bg-img__container"
      style={{
        backgroundImage: `url(${this.props.config.img})`
      }}>
        <div className="description-with-bg-img__text-container">
          <div className="description-with-bg-img__text">
            <ParagrafMedium>{this.props.config.text}</ParagrafMedium>
          </div>
          <div className="description-with-bg-img__button">
            <ButtonPrimary link={this.props.config.button.link}>
              {this.props.config.button.text}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
  }
}
