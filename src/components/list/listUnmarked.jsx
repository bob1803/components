import React from "react";
import "./listUnmarked.less";

export default class ListUnmarked extends React.Component {
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
      <ul className="list-unmarked">
        {this._itemsList.map((item, index) => (
          <li className="list-unmarked-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
