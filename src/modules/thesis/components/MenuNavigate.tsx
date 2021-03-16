import * as React from "react";
import { Nav, INavStyles, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

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
        //disabled: true - ha nincs jogosultsága? nem is kellene megjelenjen inkább
      },
      {
        name: "Elérhetőségek",
        url: "/contact",
        key: "key7"
      }
    ]
  }
];

const MenuNavigate: React.FunctionComponent = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [selectedKey, setSelectedKey] = React.useState("");
  let history = useHistory();

  let pathToCheck = location.pathname;
  if (location.pathname.indexOf("/", 2) != -1) {
    pathToCheck = location.pathname.substring(0, location.pathname.indexOf("/", 2));
  }

  const getSelectedKey = (): string => {
    if (pathToCheck === "/addNewTechnology") {
      return "key5";
    } else if (pathToCheck === "/myTopics") {
      return "key4";
    } else if (pathToCheck === "/searchPage") {
      return "key3";
    } else if (pathToCheck === "/appliedStudents") {
      return "key6";
    } else if (pathToCheck === "/publishedThesis") {
      return "key2";
    } else if (pathToCheck === "/createThesis") {
      return "key1";
    } else if (pathToCheck === "/contact") {
      return "key7";
    } else {
      return "";
    }
  };

  // oldal újratöltésekor ne vesszen el a kiválasztott kulcs
  useEffect(() => {
    setSelectedKey(getSelectedKey());
  });

  function linkClickHandler(
    event: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
    item: any
  ) {
    if (event) {
      event.preventDefault();
      history.push(item.url);
      setSelectedKey(item.key);
    }
  }

  return (
    <Nav
      ariaLabel="Nav"
      styles={navStyles}
      groups={navLinkGroups}
      selectedKey={selectedKey}
      onLinkClick={linkClickHandler}
    />
  );
};

export default MenuNavigate;
