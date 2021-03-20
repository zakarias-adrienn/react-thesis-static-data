import * as React from "react";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { Redirect } from "react-router";
import { Topic } from "../model/topics.model";
import {
  convertLanguagesToString,
  convertSchoolSemesterToString,
  convertTypeToString
} from "../helperFunctions";
import { isStudent } from "../roles";

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
  topic: Topic;
};

const SeeTopic: React.FunctionComponent<Prop> = (props) => {
  const [applied, setApplied] = React.useState(false);

  const handleApplication = () => {
    // adatbázis hívás - applyToTopic
    setApplied(true);
  };

  if (applied) {
    return <Redirect to={{ pathname: "/thesis/myTopics", state: { newApplication: true } }} />;
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
            {props.topic.title}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Leírás: </b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={{ ...rightStyle, whiteSpace: "pre-wrap" }}>
            {props.topic.description}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Témavezető:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            {props.topic.teacherId}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Téma jellege:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            {convertTypeToString(props.topic.type)}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Témaírás nyelve:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {" "}
            {convertLanguagesToString(props.topic.language)}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Félév:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {props.topic.schoolSemester === null
              ? "tetszőleges"
              : convertSchoolSemesterToString(props.topic.schoolSemester)}
          </div>
        </div>
        <div className="ms-Grid-row" style={{ paddingBottom: "20px" }}>
          <div className="ms-Grid-col ms-sm2">
            <b>Helyek száma:</b>
          </div>
          <div className="ms-Grid-col ms-sm10" style={rightStyle}>
            {props.topic.numberOfPlaces}
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
              {props.topic.connectedTechnologyIds.length === 0
                ? "Nincsen megadva kapcsolódó technológia."
                : props.topic.connectedTechnologyIds.map((id) => (
                    <li key={id} style={{ ...myLiStyle }}>
                      {id}
                    </li>
                  ))}
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
              {props.topic.connectedSubjectIds.length === 0
                ? "Nincsen megadva kapcsolódó tantárgy."
                : props.topic.connectedSubjectIds.map((id) => (
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
            {isStudent && (
              <PrimaryButton
                text="Jelentkezés"
                allowDisabledFocus
                style={{ width: "30%" }}
                disabled={props.topic.numberOfPlaces === 0}
                onClick={handleApplication}
              />
            )}
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

export default SeeTopic;
