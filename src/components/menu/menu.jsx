import * as React from "react";
import { NavLink } from "react-router-dom";
import { getViewportWidth } from "../../helpers";
import "./menu.less";
import { observable, useStrict, action, toJS } from "mobx";
import { observer } from "mobx-react";


useStrict(true);

class MenuState {
  constructor() {
    this.open = false;
  }
  @observable
  open;

  @action
  toClose() {
    this.open = false;
  }

  @action
  toggle() {
    this.open = !this.open;
  }
}

class FullMenu extends React.Component {
  render() {
    return (
      <div className="full-menu__container">
        <div className="full-menu__wrap-item">

        {this.props.menuConfig.map((item, index) => (
          <NavLink
            key={index}
            exact
            to={item.link}
            activeClassName="full-menu__item-selected"
          >
            <div className="full-menu__item">{item.title}</div>
          </NavLink>
        ))}
        </div>
      </div>
    );
  }
}

@observer
class MinMenu extends React.Component {
  constructor(props) {
    super(props);
    this._state = new MenuState();
  }

  _toggleDropdown = () => {
    this._state.toggle();
  };

  _closeDropdown = event => {
    // to prevent the _toggleDropdown from working at the same time
    if (event.target.classList.contains("min-menu__hamburger")) {
      return;
    }
    this._state.toClose();
  };

  _handlerHamburgerClick = () => {
    this._toggleDropdown();
    if (this._state.open) {
      window.addEventListener("click", this._closeDropdown, true);
    }
  };

  render() {
    return (
      <div className="min-menu__container">
        <div
          className="min-menu__hamburger-container"
          onClick={this._handlerHamburgerClick}
        >
          <span
            className={`min-menu__hamburger ${
              this._state.open ? "min-menu__dropdown-open" : null
            }`}
          />
        </div>

        <div
          className={`min-menu__dropdown ${
            !this._state.open ? "hidden" : null
          }`}
        >
          {this.props.menuConfig.map((item, index) => (
            <NavLink
              exact
              to={item.link}
              activeClassName="min-menu__item-selected"
              key={index}
            >
              <div className="min-menu__dropdown-item">{item.title}</div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}

 export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minimized: true }; //minimized = true - view gamburger
    //this.state.config = this.props.data.menuConfig;
  }

  _resize = () => {
    let newMinimizedValue =
      this.props.minWidth > getViewportWidth() ? true : false;
    this.setState({ minimized: newMinimizedValue });
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize, false);
    this._resize(); //initial the view menu
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  render() {
    return (
        this.state.minimized ? 
        <MinMenu menuConfig={this.props.config}/> :
         <FullMenu menuConfig={this.props.config}/>
    );
  }
}