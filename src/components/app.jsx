import React, { Suspense, lazy } from "react";
import { HashRouter, Route } from "react-router-dom";
import LoadingLine from "./loading/loadingLine";
import Menu from "./menu/menu";
import Header from "./header/header";
import LogoMedium from "./logo/logoMedium";
import Footer from "./footer/footer";
import "../styles/reset.less";
import "./app.less";

const Home = lazy(() => import("./home/home"));
const About = lazy(() => import("./about/about"));
const Contact = lazy(() => import("./contact/contact"));
const Blog = lazy(() => import("./blog/blog"));

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={<LoadingLine></LoadingLine>}>
          <Header>
            <LogoMedium />
            <Menu minWidth={900} />
          </Header>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Footer></Footer>
        </Suspense>
      </HashRouter>
    );
  }
}
