import React from "react";
import "./twoColumnText.less";
import ListUnmarked from "../list/listUnmarked";
import ListOrdered from "../list/listOrdered";

export default class TwoColumnText extends React.Component {
  render() {
    return (
      <div className="two-column-text__container">
        <div className="two-column-text__wrap-content">
          <div className="two-column-text__left-container">
            <ListOrdered>{this.props.config.listOrdered}</ListOrdered>
          </div>
          <div className="two-column-text__right-container">
            <ListUnmarked>{this.props.config.listUnmarked}</ListUnmarked>
          </div>
        </div>
      </div>
    );
  }
}
