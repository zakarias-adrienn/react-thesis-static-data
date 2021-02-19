import * as React from "react";
import { Nav, INavLink, INavStyles, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { useLocation } from "react-router-dom";

const navStyles: Partial<INavStyles> = {
  root: {
    width: 285,
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
        name: "Beérkezett jelentkezések kezelése",
        url: "/appliedStudents",
        key: "key6"
      },
      {
        name: "Témaböngészés",
        url: "/searchPage",
        key: "key3"
      },
      {
        name: "Jelentkezéseim",
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
  const location = useLocation();
  console.log(location.pathname);

  const getSelectedKey = (): string => {
    if (location.pathname === "/addNewTechnology") {
      return "key5";
    } else if (location.pathname === "/myTopics") {
      return "key4";
    } else if (location.pathname === "/searchPage") {
      return "key3";
    } else if (location.pathname === "/appliedStudents") {
      return "key6";
    } else if (location.pathname === "/publishedThesis") {
      return "key2";
    } else if (location.pathname === "/createThesis") {
      return "key1";
    } else {
      return "";
    }
  };

  return (
    <Nav ariaLabel="Nav" styles={navStyles} groups={navLinkGroups} selectedKey={getSelectedKey()} />
  );
};

export default MenuNavigate;
