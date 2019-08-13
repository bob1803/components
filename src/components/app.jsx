import * as React from "react";
import Header from "./header/header";

export class App extends React.Component {
  constructor(p) {
    super(p);
  }

  render() {
    return (
      <div className="app">
        Запуск моего app.jsx
        <Header />
      </div>
    );
  }
}
