import * as React from "react";
import Header from "./header/header";
import Logo from "./logo/logo";
import "../styles/reset.less";

export class App extends React.Component {
  constructor(p) {
    super(p);
  }

  render() {
    return (
      <div className="app">
        <Header>
          <Logo />
        </Header>
      </div>
    );
  }
}
