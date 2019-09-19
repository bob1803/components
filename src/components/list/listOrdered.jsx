import React from "react";
import "./listOrdered.less";

export default class ListOrdered extends React.Component {
  constructor(props) {
    super(props);
    this._itemsList = this._itemsList = this.props.children || [];
  }
  render() {
    return (
      <ol className="list-ordered">
        {this._itemsList.map((item, index) => (
          <li className="list-ordered-item" key={index}>
            {item}
          </li>
        ))}
      </ol>
    );
  }
}
