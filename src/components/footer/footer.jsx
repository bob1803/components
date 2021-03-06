import React from "react";
import "./footer.less";
import LogoSmall from "../logo/logoSmall";
import LinkSmall from "../link/linkSmall";
import LinkLarge from "../link/linkLarge";

const linksConfig = [
  {
    title: "About product",
    links: [
      { name: "Design", link: "/" },
      { name: "Tchnologies", link: "/" },
      { name: "Comment", link: "/" },
      { name: "Video reviews", link: "/" },
      { name: "Materials", link: "/" }
    ]
  },
  {
    title: "About us",
    links: [
      { name: "Email", link: "/" },
      { name: "Address", link: "/" },
      { name: "Phone", link: "/" },
      { name: "Сall back", link: "/" }
    ]
  }
];

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer__container">
          <div className="footer__wrap-content">
            <div className="footer__logo-container">
              <LogoSmall></LogoSmall>
            </div>
            <div className="footer__links-container">
              {linksConfig.map(item => (
                <div key={item.title} className="footer__links-block">
                  <p className="footer__links-block_title">{item.title}</p>
                  {item.links.map(itemLinks => (
                    <div key={itemLinks.name} className="footer__link">
                      <LinkSmall link={itemLinks.link} color="secondary">
                        {itemLinks.name}
                      </LinkSmall>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
