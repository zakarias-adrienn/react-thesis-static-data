import * as React from "react";
import { Link } from "react-router-dom";

const Header: React.FunctionComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80px",
        backgroundColor: "#0078D7",
        marginTop: "0px",
        marginBottom: "5px"
      }}
    >
      <Link to={{ pathname: "/" }}>
        <h2
          style={{
            fontFamily: "Parkavenue, cursive",
            letterSpacing: "3px",
            color: "white",
            fontSize: "180%"
          }}
        >
          Szakdolgozat és TDK témakereső modul
        </h2>
      </Link>
    </div>
  );
};

export default Header;
