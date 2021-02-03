import * as React from "react";

const Header: React.FunctionComponent = () => {
  return (
    <h2
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Garamond",
        letterSpacing: "3px",
        height: "80px",
        backgroundColor: "#0078D7",
        color: "white",
        fontSize: "30px",
        marginTop: "0px"
      }}
    >
      Szakdolgozat és TDK témakereső modul
    </h2>
  );
};

export default Header;
