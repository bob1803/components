import  React, { Suspense, lazy } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter, Route, Router} from 'react-router-dom';
import Menu from "./menu/menu";
import Header from "./header/header";
import LogoMedium from "./logo/logoMedium";
import Footer from "./footer/footer";
import "../styles/reset.less";
import gql from "graphql-tag";
import { observable, useStrict, action } from "mobx";
import { observer } from "mobx-react";
import "./app.less";

const Home = lazy(() => import("./home/home"));
const About = lazy(() => import("./about/about"));
const Contact = lazy(() => import("./contact/contact"));
const Blog = lazy(() => import("./blog/blog"));

useStrict(true);
const client = new ApolloClient({
  uri: "http://localhost:3005/graphql"
});

class AppState {
  constructor() {
    this.loading = true;
    this.queryConfig = null;
  }
  @observable
  loading;

  @observable
  queryConfig;

  @action
  setLoading() {
    this.loading = true;
  }

  @action
  setDownloaded() {
    this.loading = false;
  }

  @action
  setQueryConfig(newConfig) {
    this.queryConfig = newConfig;
  }
}

@observer
export class App extends React.Component {
  constructor(props) {
    super(props);
    this._state = new AppState();
  }
  componentDidMount() {
    client
      .query({
        query: gql`
          {
            menuConfig {
              title
              link
            }
          }
        `
      })
      .then(result => {
        this._state.setQueryConfig(result.data);
        this._state.setDownloaded();
      });
  }

  render() {
    if (this._state.loading) {
      return <p>Loading</p>;
    } else {
      return (
        <ApolloProvider client={client}>
          <HashRouter>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Header>
              <LogoMedium />
              <Menu
                minWidth={900}
                config={this._state.queryConfig.menuConfig}
              />
            </Header>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            <Footer></Footer>
            </Suspense>
          </HashRouter>
        </ApolloProvider>
      );
    }
  }
}
