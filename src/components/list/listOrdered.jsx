import React from "react";
import "./listOrdered.less";

export default class ListOrdered extends React.Component {
  render() {
    return (
      <ol className="list-ordered">
        {this.props.children.map((item, index) => (
          <li className="list-ordered-item" key={index}>
            {item}
          </li>
        ))}
      </ol>
    );
  }
}
