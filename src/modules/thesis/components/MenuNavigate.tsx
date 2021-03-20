import * as React from "react";
import { Nav, INavStyles, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { rootPath } from "../path";
import { isAdmin, isStudent, isTeacher } from "../roles";

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
      // {
      //   name: "Új téma meghirdetése",
      //   url: rootPath + "/createThesis",
      //   key: "key1"
      // },
      // {
      //   name: "Meghirdetett témáim",
      //   url: rootPath + "/publishedThesis",
      //   key: "key2"
      // },
      // {
      //   name: "Beérkezett jelentkezések kezelése",
      //   url: rootPath + "/appliedStudents",
      //   key: "key6"
      // },
      {
        name: "Témaböngészés",
        url: rootPath + "/searchPage",
        key: "key3"
      },
      {
        name: "Szakmai gyakorlati helyek",
        url: rootPath + "/practices",
        key: "key7"
      }
      // {
      //   name: "Jelentkezéseim",
      //   url: rootPath + "/myTopics",
      //   key: "key4"
      // },
      // {
      //   name: "Technológiák kezelése",
      //   url: rootPath + "/addNewTechnology",
      //   key: "key5"
      //   //disabled: true - ha nincs jogosultsága? nem is kellene megjelenjen inkább
      // }
    ]
  }
];

// egyelőre ezek beégetett konstansok
if (isAdmin) {
  navLinkGroups[0].links.push({
    name: "Szakmai gyakorlati hely kiírása",
    url: rootPath + "/createPractice",
    key: "key8"
  });
  navLinkGroups[0].links.push({
    name: "Technológiák kezelése",
    url: rootPath + "/addNewTechnology",
    key: "key5"
  });
}
if (isStudent) {
  navLinkGroups[0].links.push({
    name: "Jelentkezéseim",
    url: rootPath + "/myTopics",
    key: "key4"
  });
}
if (isTeacher) {
  navLinkGroups[0].links.push({
    name: "Új téma meghirdetése",
    url: rootPath + "/createThesis",
    key: "key1"
  });
  navLinkGroups[0].links.push({
    name: "Meghirdetett témáim",
    url: rootPath + "/publishedThesis",
    key: "key2"
  });
  navLinkGroups[0].links.push({
    name: "Beérkezett jelentkezések kezelése",
    url: rootPath + "/appliedStudents",
    key: "key6"
  });
}

function nth_ocurrence(str: string, needle: string, nth: number) {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) == needle) {
      if (!--nth) {
        return i;
      }
    }
  }
  return false;
}

const MenuNavigate: React.FunctionComponent = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [selectedKey, setSelectedKey] = React.useState("");
  let history = useHistory();

  let pathToCheck = location.pathname;
  // thesis/publishedThesis/editTopic/1
  if (nth_ocurrence(pathToCheck, "/", 3)) {
    pathToCheck = location.pathname.substring(0, nth_ocurrence(pathToCheck, "/", 3) || 0);
    console.log(pathToCheck);
  }

  const getSelectedKey = (): string => {
    if (pathToCheck === "/thesis/addNewTechnology") {
      return "key5";
    } else if (pathToCheck === "/thesis/myTopics") {
      return "key4";
    } else if (pathToCheck === "/thesis/searchPage") {
      return "key3";
    } else if (pathToCheck === "/thesis/appliedStudents") {
      return "key6";
    } else if (pathToCheck === "/thesis/publishedThesis") {
      return "key2";
    } else if (pathToCheck === "/thesis/createThesis") {
      return "key1";
    } else if (pathToCheck === "/thesis/practices") {
      return "key7";
    } else if (pathToCheck === "/thesis/createPractice") {
      return "key8";
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
      console.log(item.key);
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
