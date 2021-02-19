import * as React from "react";

const Header: React.FunctionComponent = () => {
  return (
    <>
      <img
        src={process.env.PUBLIC_URL + "/ik.jpg"}
        alt="logo"
        height="66px"
        style={{ float: "left", paddingRight: "10px", marginTop: "10px" }}
      />
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
          fontSize: "180%",
          marginTop: "0px"
        }}
      >
        Szakdolgozat és TDK témakereső modul
      </h2>
      {/* TODO: react-responsive for mobile header? */}
    </>
  );
};

export default Header;
