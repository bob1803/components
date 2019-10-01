import * as React from "react";
import "./loadingLine.less";

export default class LoadingLine extends React.Component {
  constructor(p) {
    super(p);
  }

  render() {
    return (
      <div className="loading__wrap">
        <div className="meter">
          <span></span>
        </div>
      </div>
    );
  }
}
