import * as React from "react";

import Header from "./Header";
import MenuNavigate from "./MenuNavigate";

import "office-ui-fabric-react/dist/css/fabric.css";

const WelcomePage: React.FunctionComponent = () => {
  return (
    <React.StrictMode>
      <Header></Header>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm3">
            <MenuNavigate></MenuNavigate>
          </div>
          <div className="ms-Grid-col ms-sm9">
            <p style={{ fontSize: "18px" }}>
              <b>Üdvözlet a témakereső modulban!</b> <br />
              <br />
              Diákként témaböngészésre és témára való jelentkezésre van lehetőség, tanároknak pedig
              ez a modul a témameghirdetés, témaelfogadás/elutasítás funkciókat nyújtja.
            </p>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default WelcomePage;
