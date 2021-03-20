import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { Practice } from "../model/practice.model";
import { convertLanguagesToString } from "../helperFunctions";

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
  practice: Practice;
};

const SeePractice: React.FunctionComponent<Prop> = (props) => {
  return (
    <div>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row" style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <div className="ms-Grid-col ms-sm2"></div>
          <div className="ms-Grid-col ms-sm10">
            <b style={{ fontSize: "150%" }}>Szakmai gyakorlati hely részleteinek megtekintése</b>
          </div>
        </div>

        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Cég:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {props.practice.company}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Elérhetőség: </b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {props.practice.contact.split(",").map((s) => (
              <>
                {s}
                <br />
              </>
            ))}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Leírás:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={{ ...rightStyle, whiteSpace: "pre-wrap" }}>
            {props.practice.description}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Munkavégzés helye:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {props.practice.place}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Munkavégzés nyelve:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {convertLanguagesToString(props.practice.language)}
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
              {props.practice.connectedTechnologyIds.length === 0
                ? "Nincsen megadva kapcsolódó technológia."
                : props.practice.connectedTechnologyIds.map((id) => (
                    <li key={id} style={{ ...myLiStyle }}>
                      {id}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        {/* ha diák a bejelentkezett felhasználó és nem teltek be a helyek erre a témára, akkor tud jelentkezni, akkor van ott a gomb vagy akkor aktív */}
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2"></div>
          <div className="ms-Grid-col ms-sm10" style={{ width: "60%", padding: "0px" }}>
            <DefaultButton
              style={{ float: "right" }}
              text="Vissza a böngészéshez"
              onClick={() => props.onBack()}
            ></DefaultButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeePractice;
