import React from "react";
import "./listUnordered.less";

export default class ListUnordered extends React.Component {
  render() {
    return (
      <ul className="list-unordered">
        {this.props.children.map((item, index) => (
          <li className="list-unordered-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
