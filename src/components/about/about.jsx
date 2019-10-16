import React from "react";
import "./about.less";
import SwiperX from "../swiper/swiperX";
import ListOrdered from "../list/listOrdered";
import ListUnordered from "../list/listUnordered";
import ListUnmarked from "../list/listUnmarked";
import CardMedium from "../card/cardMedium";
import { configCardMedium } from "../../config";
import { configCardsMedium } from "../../config";

export default class About extends React.Component {
  render() {
    return (
      <div>
          <SwiperX itemWidth={340}>
          {configCardsMedium.map((item, index) => (
            <CardMedium
              key={index}
              config={{
                img: item.img,
                text: item.text
              }}
            />
          ))}
        </SwiperX>
        
        <ListOrdered>
          <span>I item list</span>
          <span>I item list too</span>
          <span>I item list ordered</span>
        </ListOrdered>
        <ListUnordered>
          <a>I item list</a>
          <a>I item list too</a>
          <a>I item list unordered</a>
        </ListUnordered>
        <ListUnmarked>
          <span>I item list</span>
          <span>I item list too</span>
          <span>I item list unmarked</span>
        </ListUnmarked>
      </div>
    );
  }
}
