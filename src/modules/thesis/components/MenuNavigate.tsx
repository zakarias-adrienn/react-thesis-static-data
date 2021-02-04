import * as React from "react";
import { Nav, INavLink, INavStyles, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

const navStyles: Partial<INavStyles> = {
  root: {
    width: 230,
    height: 250,
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto"
  }
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "Új téma meghirdetése",
        url: "/createThesis",
        key: "key1"
      },
      {
        name: "Meghirdetett témáim",
        url: "/publishedThesis",
        key: "key2"
      },
      {
        name: "Témaböngészés",
        url: "/searchPage",
        key: "key3"
      },
      {
        name: "Témáim",
        url: "/myTopics",
        key: "key4"
      },
      {
        name: "Technológiák kezelése",
        url: "/addNewTechnology",
        key: "key5"
        //disabled: true
      }
    ]
  }
];

const MenuNavigate: React.FunctionComponent = () => {
  return (
    <Nav
      onLinkClick={_onLinkClick}
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === "News") {
    alert("News link clicked");
  }
}

export default MenuNavigate;
