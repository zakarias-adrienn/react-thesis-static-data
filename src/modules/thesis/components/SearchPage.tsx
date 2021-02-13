import * as React from "react";

import Button from "./Button";
import Subjects from "./Subjects";
import Technologies from "./Technologies";
import ChooseTheme from "./ChooseTheme";
import SearchTeacher from "./SearchTeacher";
import SearchByTitle from "./SearchByTitle";
import ChooseLanguage from "./ChooseLanguage";
import "office-ui-fabric-react/dist/css/fabric.css";
import {
  Topic,
  TopicType,
  SchoolSemester,
  Semester,
  TopicStatus,
  Language
} from "../model/topics.model";
import { Link } from "office-ui-fabric-react";

const topics: Topic[] = [
  {
    id: "aaa",
    type: [TopicType.BScThesis],
    title: "Youniversity",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "Vadász Péter",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 3,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    status: TopicStatus.Announced,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  }
];

type State = {
  selectedTeacher: { key: string; text: string };
  isFiltered: boolean;
};

class SearchPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedTeacher: {
        key: "",
        text: ""
      },
      isFiltered: false
    };
  }

  handleChange = (selectedItem: any) => {
    this.setState({
      ...this.state,
      selectedTeacher: {
        key: selectedItem.key,
        text: selectedItem.text
      }
    });
    console.log(this.state);
  };

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    // választott tanár kinyerése
    let teacherSearch = element.querySelector("#teacherSearch-input");
    console.log(teacherSearch);
    console.log((teacherSearch as HTMLInputElement)?.value);

    // cím alapú keresés
    let titleSearch = element.querySelector("#titleSearch");
    console.log(titleSearch);
    let titleWritten = (titleSearch as HTMLInputElement)?.value;
    console.log(titleWritten);
    let searchResult: Topic[] = topics;
    if (titleWritten !== "") {
      console.log("címet is próbál keresni");
      searchResult = topics.filter(
        (topic) => topic.title.toLowerCase().indexOf(titleWritten.toLowerCase()) !== -1
      );
      console.log(searchResult);
    }

    // ebben benne van a tanár id-ja is
    console.log(this.state);
    if (this.state.selectedTeacher.key !== "") {
      searchResult = searchResult.filter(
        (topic) => topic.teacherId === this.state.selectedTeacher.key
      );
    }
    console.log(searchResult);
    if (searchResult.length === 0) {
      console.log("Nincs a feltételeknek megfelelő találat!");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6">
              <SearchByTitle></SearchByTitle>
              {this.state.isFiltered && (
                <>
                  <ChooseTheme></ChooseTheme>
                  <ChooseLanguage></ChooseLanguage>
                </>
              )}
            </div>
            <div className="ms-Grid-col ms-sm6">
              <Link
                onClick={() =>
                  this.setState({
                    ...this.state,
                    isFiltered: !this.state.isFiltered
                  })
                }
              >
                Szűrők {!this.state.isFiltered ? <>megjelenítése</> : <>elrejtése</>}
              </Link>
              {this.state.isFiltered && (
                <>
                  <SearchTeacher onChange={this.handleChange}></SearchTeacher>
                  <Subjects></Subjects>
                  <Technologies></Technologies>
                </>
              )}
            </div>
          </div>
          <br />
          <Button></Button>
        </div>
      </form>
    );
  }
}

export default SearchPage;
