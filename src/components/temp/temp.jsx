import React from "react";
import CardMedium from "../card/cardMedium";
import { configCardsMedium } from "../../config";
import "./temp.less";

export default class Temp extends React.Component {
  render() {
    return (
      <div className="temp__container">
        {configCardsMedium.map((item, index) => (
          <div key={index} className="temp__item">
            <CardMedium
              config={{
                img: item.img,
                text: item.text
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
