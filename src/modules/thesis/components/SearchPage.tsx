import * as React from "react";

import MySubmitButton from "./MySubmitButton";
import Subjects from "./Subjects";
import Technologies from "./Technologies";
import ChooseTheme from "./ChooseTheme";
import SearchTeacher from "./SearchTeacher";
import SearchByTitle from "./SearchByTitle";
import ChooseLanguage from "./ChooseLanguage";
import "office-ui-fabric-react/dist/css/fabric.css";
import { Topic, TopicType, Semester, Language } from "../model/topics.model";
import { Link } from "office-ui-fabric-react";
import SearchResult from "./SearchResult";
import MySpinner from "./MySpinner";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Text } from "office-ui-fabric-react/lib/Text";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

const horizontalChoiceGroupStyles = {
  flexContainer: { display: "flex", flexDirection: "row" },
  marginTop: "0px",
  paddingTop: "0px"
};

const semesters: IChoiceGroupOption[] = [
  { key: "autumn", text: "Ősz", styles: { root: { marginRight: "10px", marginTop: "0px" } } },
  { key: "spring", text: "Tavasz", styles: { root: { marginTop: "0px" } } }
];

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
    appliedStudentIds: [],
    language: [Language.Hungarian]
  }
];

type State = {
  selectedTeacher: { key: string; text: string };
  isFiltered: boolean;
  isSearchResult: boolean;
  isSearchProgress: boolean;
  hideHeaderSearch: boolean;
  isGoodDate: boolean;
};

class SearchPage extends React.Component<{}, State> {
  private choiceGroupRef: any;

  constructor(props: any) {
    super(props);

    this.choiceGroupRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.toogleHide = this.toogleHide.bind(this);
    this.getErrorSemester = this.getErrorSemester.bind(this);

    this.state = {
      selectedTeacher: {
        key: "",
        text: ""
      },
      isFiltered: false,
      isSearchResult: false,
      isSearchProgress: false,
      hideHeaderSearch: false,
      isGoodDate: true
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

    // félévet is bele kell építeni
    console.log(element.querySelector("#maskedField"));
    let years = (element.querySelector("#maskedField") as HTMLInputElement)?.value;
    console.log(years);

    // tavasz vagy ősz
    console.log("Tavasz vagy ősz:", this.choiceGroupRef.current?.checkedOption);

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

  getErrorSemester = (value: string): string => {
    let first = parseInt(value.substring(2, 4));
    let second = parseInt(value.substring(5, 7));
    const regex = new RegExp("[0-9][0-9][0-9][0-9]/[0-9][0-9]");
    let currentYear = new Date().getFullYear();
    console.log(currentYear);
    let enteredValueString = value.substring(0, 2) + value.substring(5, 7);
    console.log(enteredValueString);
    let enteredValue = parseInt(enteredValueString);
    if (!regex.test(value)) {
      this.setState((state) => ({
        ...this.state,
        isGoodDate: false
      }));
      return "Tanév formátuma nem helyes szintaktikailag! Példa helyes formátumra: 2020/21";
    }
    if (second !== first + 1) {
      this.setState((state) => ({
        ...this.state,
        isGoodDate: false
      }));
      console.log(this.state);
      return "Tanév formátuma nem helyes szemantikailag! Példa helyes formátumra: 2020/21";
    }
    // régebbit is megtekinthet ugye?? - mondjuk nem jelentkezhet? akkor csak aktív témákra jelentkezhet? aktív mező kellene? ki dönti el hogy aktív-e?
    // if (enteredValue < currentYear) {
    //   this.setState((state) => ({
    //     ...this.state,
    //     isGoodDate: false
    //   }));
    //   return "Tanév értéke nem lehet kisebb mint a jelenlegi tanév.";
    // }
    this.setState((state) => ({
      ...this.state,
      isGoodDate: true
    }));
    return "";
  };

  onClickSearch() {
    // TODO: lehetne loading?
    if (this.state.isSearchResult) {
      this.setState({
        ...this.state,
        isSearchProgress: true,
        isSearchResult: false
      });
    } else {
      this.setState({
        ...this.state,
        isSearchProgress: true
      });
    }
    setTimeout(() => {
      this.setState({
        ...this.state,
        isSearchResult: true,
        isSearchProgress: false
      });
    }, 2000);
  }

  private toogleHide() {
    this.setState({
      ...this.state,
      hideHeaderSearch: !this.state.hideHeaderSearch
    });
  }

  render() {
    return (
      <>
        {!this.state.hideHeaderSearch && (
          <>
            <form onSubmit={this.handleSubmit}>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <SearchByTitle></SearchByTitle>
                    <br />
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
                        <div className="ms-Grid" dir="ltr">
                          <div className="ms-Grid-row" style={{ marginBottom: "10px" }}>
                            <div className="ms-Grid-col ms-sm3">
                              <MaskedTextField
                                label="Tanév"
                                name="Tanév"
                                mask="2099/99"
                                id="maskedField"
                                onGetErrorMessage={this.getErrorSemester}
                                validateOnLoad={false}
                              />
                            </div>
                            <div className="ms-Grid-col ms-sm9" style={{ paddingTop: "10px" }}>
                              <Text
                                style={{ fontWeight: 500, paddingTop: "60px", marginBottom: "0px" }}
                              >
                                Félév
                              </Text>
                              <ChoiceGroup
                                styles={horizontalChoiceGroupStyles}
                                name="autumnorspring"
                                defaultSelectedKey="autumn"
                                options={semesters}
                                required={true}
                                componentRef={this.choiceGroupRef}
                              />
                            </div>
                          </div>
                          <div className="ms-Grid-row" style={{ width: "83%" }}>
                            <MessageBar
                              messageBarType={MessageBarType.warning}
                              isMultiline={false}
                              dismissButtonAriaLabel="Close"
                            >
                              Megadás hiányában az aktuális félévben meghirdetett témák jelenítődnek
                              meg.
                            </MessageBar>
                            {/* Akkor is ha simán keresés? Ha nincs aktuális félévben téma?
                              Honnan jön az aktuális félév? */}
                          </div>
                        </div>
                        <SearchTeacher onChange={this.handleChange}></SearchTeacher>
                        <Subjects></Subjects>
                        <Technologies></Technologies>
                      </>
                    )}
                  </div>
                </div>
                <br />
                <MySubmitButton
                  onClick={this.onClickSearch}
                  disabled={!this.state.isGoodDate}
                ></MySubmitButton>
              </div>
            </form>
            <br />
            <br />
          </>
        )}
        {this.state.isSearchProgress && <MySpinner label="Folyamatban a keresés..."></MySpinner>}
        {this.state.isSearchResult && (
          <SearchResult hideHeaderSearch={this.toogleHide}></SearchResult>
        )}
      </>
    );
  }
}

export default SearchPage;
