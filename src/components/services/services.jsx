import React from "react";
import "./services.less";
import Swiper from "../swiper/swiper";
import CardMedium from "../card/cardMedium";
import {configCardsMedium} from "../../config";

const servicesConfig = {
    title: "Services",
    configCards: configCardsMedium
}

export default class Services extends React.Component {
   
    render() {
        return (<div className="services__container">
            <div className="services__title">
                {servicesConfig.title}
            </div>
            <div className="services__swiper">
            <Swiper itemWidth={340}>
              {servicesConfig.configCards.map((item, index) => (
                <CardMedium
                  key={index}
                  config={{
                      img: item.img,
                      text: item.text
                  }}
                />
              ))}
            </Swiper>
            </div>
        </div>)
    }
}