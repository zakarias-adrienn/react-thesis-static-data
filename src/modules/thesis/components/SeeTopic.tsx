import * as React from "react";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { PrimaryButton } from "office-ui-fabric-react";
import { Redirect } from "react-router";

let options: IDropdownOption[] = [
  { key: "Webprogramozás", text: "Webprogramozás" },
  { key: "Mesterséges intelligencia", text: "Mesterséges intelligencia" },
  { key: "Telekommunikációs hálózatok", text: "Telekommunikációs hálózatok" },
  { key: "Konkurens programozás", text: "Konkurens programozás" },
  { key: "Algoritmusok és adatszerkezetek 1", text: "Algoritmusok és adatszerkezetek 1" }
];

options = options.sort((a, b) => (a.key > b.key ? 1 : -1));

let options2: IDropdownOption[] = [
  { key: "JAVA", text: "JAVA" },
  { key: "C++", text: "C++" },
  { key: "HTML5", text: "HTML5" },
  { key: "CSS", text: "CSS" },
  { key: "Javascript", text: "Javascript" },
  { key: "React", text: "React" }
];

options2 = options2.sort((a, b) => (a.key > b.key ? 1 : -1));

// const colors = [
//   "#FFB900",
//   "#E74856",
//   "#0078D7",
//   "#767676",
//   "#FF8C00",
//   "#E81123",
//   "#0063B1",
//   "#2D7D9A",
//   "#F7630C",
//   "#EA005E",
//   "#8E8CD8",
//   "#00B7C3",
//   "#038387",
//   "#00B294",
//   "#018574",
//   "#EF6950",
//   "#BF0077",
//   "#744DA9",
//   "#567C73",
//   "#647C64",
//   "#4C4A48",
//   "#0063B1"
// ];

// function getRandomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

const myLiStyle: React.CSSProperties = {
  padding: "3px",
  width: "20%",
  borderRadius: "25px",
  display: "inline-block",
  textAlign: "center",
  marginLeft: "5px",
  color: "white",
  backgroundColor: "#8E8CD8"
};

const rightStyle = {
  backgroundColor: "rgb(237, 235, 233)",
  padding: "8px",
  width: "60%"
};

type Prop = {
  onBack: Function;
  id: string;
};

const SeeTopic: React.FunctionComponent<Prop> = (props) => {
  const [applied, setApplied] = React.useState(false);

  // useState - getTopicById - props.id

  const handleApplication = () => {
    // adatbázis hívás - applyToTopic
    setApplied(true);
  };

  if (applied) {
    return <Redirect to="/myTopics" />;
  }

  return (
    <div>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row" style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <div className="ms-Grid-col ms-sm2"></div>
          <div className="ms-Grid-col ms-sm10">
            <b style={{ fontSize: "150%" }}>Téma részleteinek megtekintése</b>
          </div>
        </div>

        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Cím:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            Youniversity
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Leírás: </b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Témavezető:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            Visnovitz Márton
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Téma jellege:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            BSc szakdolgozati, BSc TDK
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Témaírás nyelve:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            magyar, angol
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Félév:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            2020/21-ősz
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Helyek száma:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            1
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Kapcsolódó technológiák:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            <ul
              style={{
                paddingLeft: "0px",
                marginTop: "0px",
                listStyleType: "none",
                marginBottom: "0px"
              }}
            >
              <li style={{ ...myLiStyle }}>React</li>
              {/* speckó szélesség kellene mindenik li badgenék? */}
              <li style={{ ...myLiStyle }}>Typescript</li>
            </ul>
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Kapcsolódó tantárgyak:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            <ul
              style={{
                paddingLeft: "0px",
                marginTop: "0px",
                listStyleType: "none",
                marginBottom: "0px"
              }}
            >
              <li style={{ ...myLiStyle }}>Webprogramozás</li>
              <li style={{ ...myLiStyle }}>Számításelmélet</li>
            </ul>
          </div>
        </div>
        {/* ha diák a bejelentkezett felhasználó és nem teltek be a helyek erre a témára, akkor tud jelentkezni, akkor van ott a gomb vagy akkor aktív */}
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2"></div>
          <div className="ms-Grid-col ms-sm10" style={{ width: "60%", padding: "0px" }}>
            <PrimaryButton
              text="Jelentkezés"
              allowDisabledFocus
              style={{ width: "30%" }}
              disabled={false} /* numofPlaces==0 */
              onClick={handleApplication}
            />
            <PrimaryButton
              style={{ float: "right" }}
              text="Vissza a böngészéshez"
              onClick={() => props.onBack()}
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeTopic;