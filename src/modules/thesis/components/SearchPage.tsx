import * as React from "react";

import Button from "./Button";
import Subjects from "./Subjects";
import Technologies from "./Technologies";
import ChooseTheme from "./ChooseTheme";
import SearchTeacher from "./SearchTeacher";
import SearchByTitle from "./SearchByTitle";
import ChooseLanguage from "./ChooseLanguage";
import "office-ui-fabric-react/dist/css/fabric.css";
import Header from "./Header";

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  alert("Hali");
  event.preventDefault();
  console.log(event.target);
  let element = event.target as HTMLInputElement;
  console.log(element.querySelector("#chooseType"));
  let checkBoxDiv = element.querySelector("#chooseType");
  console.log(checkBoxDiv?.querySelectorAll('input[type="checkbox"]'));
  let checkBoxes = checkBoxDiv?.querySelectorAll('input[type="checkbox"]');
  console.log(checkBoxes?.item(0).getAttribute("aria-checked"));
  // szakdoga vagy TDK be van-e pipálva
  let thesisTypeisChecked = checkBoxes?.item(0).getAttribute("aria-checked");
  let tdkTypeisChecked = checkBoxes?.item(1).getAttribute("aria-checked");

  // a választott tantárgyak kinyerése
  let subjectsDiv = element.querySelector("#subjects");
  console.log(subjectsDiv);
  let dropDown = subjectsDiv?.querySelector("#Dropdown51-option");
  console.log(dropDown);
  console.log(dropDown?.innerHTML); // ezek a tantárgyak ,-vel felsorolva
}

const SearchPage = () => (
  <form onSubmit={handleSubmit}>
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm6">
          <ChooseTheme></ChooseTheme>
          <ChooseLanguage></ChooseLanguage>
          <br />
          <SearchByTitle></SearchByTitle>
        </div>
        <div className="ms-Grid-col ms-sm6">
          <SearchTeacher></SearchTeacher>
          <Subjects></Subjects>
          <Technologies></Technologies>
        </div>
      </div>
      <br />
      <Button></Button>
    </div>
  </form>
);

export default SearchPage;
