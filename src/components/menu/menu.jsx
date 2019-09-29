import * as React from "react";
import { NavLink } from "react-router-dom";
import "./menu.less";
import { observable, useStrict, action } from "mobx";
import { observer } from "mobx-react";
import { menuConfig } from "../../../data/config";

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

@observer
export default class Menu extends React.Component {
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
      <div className="menu__container">
        <div className="full-menu__container">
          <div className="full-menu__wrap-item">
            {menuConfig.map((item, index) => (
              <NavLink
                key={index}
                exact
                to={item.link}
                activeClassName="full-menu__item-selected"
              >
                <div className="full-menu__item">
                  <span>{item.title}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="min-menu__container">
          <div
            className="min-menu__hamburger-container"
            onClick={this._handlerHamburgerClick}
          >
            <span
              className={`min-menu__hamburger ${
                this._state.open ? "min-menu__dropdown-open" : ""
              }`}
            />
          </div>

          <div
            className={`min-menu__dropdown ${
              !this._state.open
                ? "min-menu__dropdown-clossed"
                : "min-menu__dropdown-opened"
            }`}
          >
            {menuConfig.map((item, index) => (
              <NavLink
                exact
                to={item.link}
                activeClassName="min-menu__item-selected"
                key={index}
              >
                <div
                  className={`min-menu__dropdown-item ${
                    index === 0 ? "min-menu__dropdown-item-first" : ""
                  }`}
                >
                  {item.title}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
