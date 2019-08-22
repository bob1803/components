import * as React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from "./menu/menu";
import Header from "./header/header";
import Logo from "./logo/logo";
import Home from "./home/home";
import About from "./about/about";
import Contact from "./contact/contact";
import Blog from "./blog/blog";
import "../styles/reset.less";

const client = new ApolloClient({
  uri: "http://localhost:3005/graphql"
});

export class App extends React.Component {
  constructor(p) {
    super(p);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header>
            <Logo />
            <Menu minWidth={900} />
          </Header>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
        </Router>
      </ApolloProvider>
    );
  }
}
