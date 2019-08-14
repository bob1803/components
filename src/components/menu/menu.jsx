import * as React from "react";
import { NavLink } from "react-router-dom";
import { getViewportWidth } from "../../helpers";
import "./menu.less";

const menuConfig = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "About",
    link: "/about"
  },
  {
    title: "Contact",
    link: "/contact"
  },
  {
    title: "Blog",
    link: "/blog"
  }
];

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this._viewportWidth = getViewportWidth();
  }
  render() {
    console.log(this.props, "from menu");
    return (
      <div className="menu__container">
        {menuConfig.map((item, index) => (
          <div key={index} className="menu__item">
            <NavLink exact to={item.link} activeClassName="menu__item-selected">
              {item.title}
            </NavLink>
          </div>
        ))}
      </div>
    );
  }
}
