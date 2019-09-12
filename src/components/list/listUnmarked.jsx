import React from "react";
import "./listUnmarked.less";

export default class ListUnmarked extends React.Component {
  render() {
    return (
      <ul className="list-unmarked">
        {this.props.children.map((item, index) => (
          <li className="list-unmarked-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
