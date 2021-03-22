import { Separator } from "@fluentui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { rootPath } from "../path";
import { Text } from "office-ui-fabric-react/lib/Text";

const styles = {
  root: [
    {
      selectors: {
        "::before": {
          background: "#68768A"
        }
      }
    }
  ]
};

const Header: React.FunctionComponent = () => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "80px",
    //     backgroundColor: "#0078D7",
    //     marginTop: "0px",
    //     marginBottom: "5px"
    //   }}
    // >
    <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px" }}>
      <Separator styles={styles}>
        <Link to={{ pathname: rootPath }}>
          <Text
            style={{
              fontFamily: "Parkavenue, cursive",
              letterSpacing: "3px",
              fontSize: "180%",
              color: "#0078D7"
            }}
          >
            Szakdolgozat- és TDK-témakereső Modul
          </Text>
        </Link>
      </Separator>
      {/* <h2
          style={{
            fontFamily: "Parkavenue, cursive",
            letterSpacing: "3px",
            color: "white",
            fontSize: "180%"
          }}
        >
          Szakdolgozat és TDK témakereső modul */}
      {/* </h2> */}
    </div>
  );
};

export default Header;
