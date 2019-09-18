import React from "react";
import "./listUnordered.less";

export default class ListUnordered extends React.Component {
  constructor(props) {
    super(props);
    this._itemsList = [];
  }
  componentWillReceiveProps() {
    if (this.props.children) {
      this._itemsList = this.props.children;
    }
  }
  render() {
    return (
      <ul className="list-unordered">
        {this._itemsList.map((item, index) => (
          <li className="list-unordered-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
