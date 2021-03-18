import * as React from "react";

import MySubmitButton from "./MySubmitButton";
import Subjects from "./Subjects";
import Technologies from "./Technologies";
import ChooseTheme, { CheckedOptions } from "./ChooseTheme";
import SearchByTeacher from "./SearchByTeacher";
import SearchByTitle from "./SearchByTitle";
import ChooseLanguage, { CheckedOptionsL } from "./ChooseLanguage";
import "office-ui-fabric-react/dist/css/fabric.css";
import { Topic, TopicType, Semester, Language } from "../model/topics.model";
import { Link } from "office-ui-fabric-react";
import SearchResult from "./SearchResult";
import MySpinner from "./MySpinner";
import { MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Text } from "office-ui-fabric-react/lib/Text";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
// import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import { Stack } from "office-ui-fabric-react/lib/Stack";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KERESÉSI ALGORITMUS ÍRÁSÁHOZ PÉLDA TÉMÁK:
const topics: Topic[] = [
  {
    id: "a",
    type: [TopicType.BScThesis],
    title: "Youniversity",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "Visnovitz Márton",
    connectedSubjectIds: [
      "Webprogramozás",
      "Kliensoldali webprogramozás",
      "Szerveroldali webprogramozás"
    ],
    connectedTechnologyIds: ["Javascript", "React"],
    numberOfPlaces: 3,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "b",
    type: [TopicType.BScThesis, TopicType.BScTDK],
    title: "Téma1",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "Vadász Péter",
    connectedSubjectIds: [
      "Konkurens programozás",
      "Számítógépes rendszerek",
      "Telekommunikációs hálózatok"
    ],
    connectedTechnologyIds: ["JAVA"],
    numberOfPlaces: 1,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "c",
    type: [TopicType.BScThesis],
    title: "Téma2",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "Dr. Csuhaj Varjú Erzsébet",
    connectedSubjectIds: ["Algoritmusok és adatszerkezetek 1"],
    connectedTechnologyIds: ["C"],
    numberOfPlaces: 2,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian, Language.English]
  },
  {
    id: "d",
    type: [TopicType.MScTDK],
    title: "Téma3",
    description: "Oktatásszervezési csomag fejlesztése egyetemünk számára",
    teacherId: "Dr. Csuhaj Varjú Erzsébet",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 0,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian, Language.English]
  },
  {
    id: "e",
    type: [TopicType.MScTDK],
    title: "Téma4",
    description: "Bonyolult",
    teacherId: "Brányi László",
    connectedSubjectIds: ["Algoritmusok és adatszerkezetek 2"],
    connectedTechnologyIds: ["C++"],
    numberOfPlaces: 1,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "f",
    type: [TopicType.BScThesis],
    title: "Téma5",
    description: "Bonyolult",
    teacherId: "Brányi László",
    connectedSubjectIds: ["Adatbázisok 1", "Adatbázisok 2"],
    connectedTechnologyIds: ["Oracle", "MySQL", "SQLite"],
    numberOfPlaces: 1,
    schoolSemester: null,
    appliedStudentIds: [],
    language: [Language.Hungarian]
  }
];

let teachersToDepartments = new Map<String, String[]>();
teachersToDepartments.set("Algoritmusok és alkalmazásaik", [
  "Pusztai Kinga",
  "Ásványi Tibor",
  "Nagy Sára",
  "Veszprémi Anna",
  "Dr. Csuhaj Varjú Erzsébet",
  "Vadász Péter"
]);
teachersToDepartments.set("Numerikus analízis", [
  "Chripkó Ágnes",
  "Csörgõ István",
  "Filipp Zoltán",
  "Dr. Gergó Lajos",
  "Dr. Szarvas Kristóf"
]);
teachersToDepartments.set("Információs rendszerek", [
  "Dr. Kiss Attila",
  "Dr. Hajas Csilla",
  "Dr. Laki Sándor",
  "Dr. Nikovits Tibor",
  "Dr. Vincellér Zoltán",
  "Brányi László",
  "Dr. Vörös Péter"
]);
teachersToDepartments.set("Komputeralgebra", ["Burcsi Péter", "Dr. Járai Antal", "Tóth Viktória"]);
teachersToDepartments.set("Programozáselmélet és szoftvertechnológia", [
  "Dr. Gregorics Tibor",
  "Borsi Zsolt",
  "Cserép Máté",
  "Dr. Szendrei Rudolf",
  "Dr. Várkonyi Teréz Anna"
]);
teachersToDepartments.set("Programozási nyelvek és fordítóprogramok", [
  "Dr. Horváth Zoltán",
  "Kitlei Róbert",
  "Dr. Kozsik Tamás",
  "Dr. Pataki Norbert",
  "Dr. Porkoláb Zoltán",
  "Dr. Tejfel Máté"
]);
teachersToDepartments.set("Média és oktatásinformatika", [
  "Dr. Abonyi-Tóth Andor",
  "Dr. Zsakó László",
  "Dr. Bernát Péter",
  "Dr. Horváth Győző",
  "Visnovitz Márton"
]);
teachersToDepartments.set("Valószínűségelméleti és Statisztika", [
  "Arató Miklós",
  "Zempléni András"
]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STÍLUSOK
const horizontalChoiceGroupStyles = {
  flexContainer: { display: "flex", flexDirection: "row" },
  marginTop: "0px",
  paddingTop: "0px"
};

// CHOICEGROUP OPCIÓK
const semesters: IChoiceGroupOption[] = [
  { key: "autumn", text: "Ősz", styles: { root: { marginRight: "10px", marginTop: "0px" } } },
  { key: "spring", text: "Tavasz", styles: { root: { marginTop: "0px" } } }
];

const mainSemesters: IChoiceGroupOption[] = [
  {
    key: "every",
    text: "Tetszőleges félév",
    styles: { root: { marginRight: "10px", marginTop: "0px" } }
  },
  { key: "given", text: "Adott félév", styles: { root: { marginTop: "0px" } } }
];

// KERESÉS ÁLLAPOTA
type State = {
  isFiltered: boolean;
  isSearchResult: boolean;
  isSearchProgress: boolean;
  hideHeaderSearch: boolean;
  isGoodDate: boolean;
  isGivenSemester: boolean;
  searchResult: Topic[];
  chooseTypeCheckBoxes: CheckedOptions;
  chooseLanguageCheckBoxes: CheckedOptionsL;
  selectedValidity: string;
  selectedSemester: string;
  selectedDepartment: string;
  selectedTeacher: string;
  selectedTeacher2: string[];
  byDepartment: boolean;
  year: string;
  subjects: string[];
  technologies: string[];
};

class SearchPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.toogleHide = this.toogleHide.bind(this);
    this.getErrorSemester = this.getErrorSemester.bind(this);
    this.changeSemester = this.changeSemester.bind(this);
    this.changeTypeCheckBox = this.changeTypeCheckBox.bind(this);
    this.changeLanguageCheckBox = this.changeLanguageCheckBox.bind(this);
    this.changeSpringAutumn = this.changeSpringAutumn.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.onChangeTeacherByName = this.onChangeTeacherByName.bind(this);
    this.onChangeSubjects = this.onChangeSubjects.bind(this);
    this.onChangeTechnologies = this.onChangeTechnologies.bind(this);

    this.state = {
      isFiltered: false,
      isSearchResult: false,
      isSearchProgress: false,
      hideHeaderSearch: false,
      isGoodDate: true,
      isGivenSemester: true,
      searchResult: topics,
      chooseTypeCheckBoxes: {
        BScThesis: false,
        BScTDK: false,
        MScThesis: false,
        MScTDK: false,
        Projekt: false
      },
      chooseLanguageCheckBoxes: {
        hungarian: false,
        english: false
      },
      selectedValidity: "given",
      selectedSemester: "autumn",
      selectedDepartment: "",
      selectedTeacher: "",
      selectedTeacher2: [],
      byDepartment: true,
      year: "",
      subjects: [],
      technologies: []
    };
  }

  // HELYES KITÖLTÉST ELLENŐRZŐ FGVEK
  private getErrorSemester = (value: string): string => {
    let first = parseInt(value.substring(2, 4));
    let second = parseInt(value.substring(5, 7));
    const regex = new RegExp("[0-9][0-9][0-9][0-9]/[0-9][0-9]");
    let currentYear = new Date().getFullYear();
    let enteredValueString = value.substring(0, 2) + value.substring(5, 7);
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
      return "Tanév formátuma nem helyes szemantikailag! Példa helyes formátumra: 2020/21";
    }
    // régebbit is kereshet
    this.setState((state) => ({
      ...this.state,
      isGoodDate: true
    }));
    return "";
  };

  // töltődést szimuláló fgv
  private onClickSearch() {
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

  // KONTROLLÁLT KOMPONENSEK VÁLTOZTATÁSA VÁLTOZTATJA A STATE-ET
  public changeTypeCheckBox(which: string) {
    if (which === "BScThesis") {
      this.setState({
        ...this.state,
        chooseTypeCheckBoxes: {
          ...this.state.chooseTypeCheckBoxes,
          BScThesis: !this.state.chooseTypeCheckBoxes.BScThesis
        }
      });
    } else if (which === "BScTDK") {
      this.setState({
        ...this.state,
        chooseTypeCheckBoxes: {
          ...this.state.chooseTypeCheckBoxes,
          BScTDK: !this.state.chooseTypeCheckBoxes.BScTDK
        }
      });
    } else if (which === "MScThesis") {
      this.setState({
        ...this.state,
        chooseTypeCheckBoxes: {
          ...this.state.chooseTypeCheckBoxes,
          MScThesis: !this.state.chooseTypeCheckBoxes.MScThesis
        }
      });
    } else if (which === "MScTDK") {
      this.setState({
        ...this.state,
        chooseTypeCheckBoxes: {
          ...this.state.chooseTypeCheckBoxes,
          MScTDK: !this.state.chooseTypeCheckBoxes.MScTDK
        }
      });
    } else {
      this.setState({
        ...this.state,
        chooseTypeCheckBoxes: {
          ...this.state.chooseTypeCheckBoxes,
          Projekt: !this.state.chooseTypeCheckBoxes.Projekt
        }
      });
    }
  }

  public changeLanguageCheckBox(which: string) {
    if (which === "hungarian") {
      this.setState({
        ...this.state,
        chooseLanguageCheckBoxes: {
          ...this.state.chooseLanguageCheckBoxes,
          hungarian: !this.state.chooseLanguageCheckBoxes.hungarian
        }
      });
    } else {
      this.setState({
        ...this.state,
        chooseLanguageCheckBoxes: {
          ...this.state.chooseLanguageCheckBoxes,
          english: !this.state.chooseLanguageCheckBoxes.english
        }
      });
    }
  }

  public onChangeDepartment(department: string) {
    // lehet aztán id-k ezek
    this.setState({
      ...this.state,
      selectedDepartment: department,
      selectedTeacher: ""
    });
  }

  public onChangeTeacher(teacher: string) {
    // lehetnek id-k, csak a megjelenítésnél kell vigyázni
    this.setState({
      ...this.state,
      selectedTeacher: teacher
    });
  }

  public onChangeTeacherByName(teacher: string[]) {
    this.setState({
      ...this.state,
      selectedTeacher2: teacher
    });
  }

  public onChangeSubjects(subject: string) {
    if (this.state.subjects.includes(subject)) {
      let newSubjects = this.state.subjects.filter((s) => s !== subject);
      this.setState({
        ...this.state,
        subjects: newSubjects
      });
    } else {
      this.setState({
        ...this.state,
        subjects: [...this.state.subjects, subject]
      });
    }
  }

  public onChangeTechnologies(technology: string) {
    if (this.state.technologies.includes(technology)) {
      let newTechnologies = this.state.technologies.filter((s) => s !== technology);
      this.setState({
        ...this.state,
        technologies: newTechnologies
      });
    } else {
      this.setState({
        ...this.state,
        technologies: [...this.state.technologies, technology]
      });
    }
  }

  private changeSemester(
    ev: React.FormEvent<HTMLInputElement | HTMLElement> | undefined,
    option: IChoiceGroupOption | undefined
  ) {
    this.setState({
      ...this.state,
      isGivenSemester: !this.state.isGivenSemester,
      selectedValidity: option?.key || ""
    });
  }

  private changeSpringAutumn(
    ev: React.FormEvent<HTMLInputElement | HTMLElement> | undefined,
    option: IChoiceGroupOption | undefined
  ) {
    this.setState({
      ...this.state,
      selectedSemester: option?.key || ""
    });
  }

  // TÉMA MEGTEKINTÉSEKOR NE JELENJEN MEG A KERESÉS FEJLÉCE
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
                        <ChooseTheme
                          checked={this.state.chooseTypeCheckBoxes}
                          onChange={this.changeTypeCheckBox}
                        ></ChooseTheme>
                        <ChooseLanguage
                          checked={this.state.chooseLanguageCheckBoxes}
                          onChange={this.changeLanguageCheckBox}
                        ></ChooseLanguage>
                        {/* <SearchTeacher onChange={this.handleChange}></SearchTeacher> - RÉGEBBI VÁLTOZAT*/}
                        <SearchByTeacher
                          byDepartment={this.state.byDepartment}
                          setByDepartment={() =>
                            this.setState({ ...this.state, byDepartment: !this.state.byDepartment })
                          }
                          selectedDepartment={this.state.selectedDepartment}
                          onChangeDepartment={this.onChangeDepartment}
                          selectedTeacher={this.state.selectedTeacher}
                          onChangeTeacher={this.onChangeTeacher}
                          selectedTeacher2={this.state.selectedTeacher2}
                          onChangeTeacher2={this.onChangeTeacherByName}
                        ></SearchByTeacher>
                      </>
                    )}
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Link
                      style={{ marginBottom: "40px", marginTop: "10px" }}
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
                            <div className="ms-Grid-col ms-sm12">
                              <Text style={{ fontWeight: 500, marginTop: "10px" }}>
                                Téma érvényességi ideje
                              </Text>
                              <Stack style={{ marginBottom: "10px", marginTop: "5px" }}>
                                <ChoiceGroup
                                  styles={horizontalChoiceGroupStyles}
                                  name="everyorgiven"
                                  selectedKey={this.state.selectedValidity}
                                  options={mainSemesters}
                                  required={true}
                                  onChange={this.changeSemester}
                                />
                              </Stack>
                            </div>
                          </div>
                          {this.state.isGivenSemester && (
                            <>
                              <div className="ms-Grid-row" style={{ marginBottom: "10px" }}>
                                <div className="ms-Grid-col ms-sm3">
                                  <MaskedTextField
                                    label="Tanév"
                                    name="Tanév"
                                    mask="2099/99"
                                    id="maskedField"
                                    onGetErrorMessage={this.getErrorSemester}
                                    validateOnLoad={false}
                                    onChange={(ev, newVa) =>
                                      this.setState({
                                        ...this.state,
                                        year: newVa?.substring(2) || ""
                                      })
                                    }
                                    value={this.state.year}
                                  />
                                </div>
                                <div className="ms-Grid-col ms-sm9" style={{ paddingTop: "10px" }}>
                                  <Text
                                    style={{
                                      fontWeight: 500,
                                      paddingTop: "60px",
                                      marginBottom: "0px"
                                    }}
                                  >
                                    Félév
                                  </Text>
                                  <ChoiceGroup
                                    styles={horizontalChoiceGroupStyles}
                                    name="autumnorspring"
                                    selectedKey={this.state.selectedSemester}
                                    onChange={this.changeSpringAutumn}
                                    options={semesters}
                                    required={true}
                                  />
                                </div>
                              </div>
                              {/* <div className="ms-Grid-row" style={{ width: "95%" }}>
                                <MessageBar
                                  messageBarType={MessageBarType.warning}
                                  isMultiline={false}
                                  dismissButtonAriaLabel="Close"
                                >
                                  Kitöltés nélkül az aktuális félévre szóló és a tetszőleges
                                  időtartamú témák jelenítődnek meg.
                                </MessageBar>
                                {/* Akkor is ha simán keresés? Ha nincs aktuális félévben téma?
                              Honnan jön az aktuális félév? aktuális dátumból
                              </div> */}
                              <br />
                            </>
                          )}
                        </div>

                        <Subjects
                          subjects={this.state.subjects}
                          onChange={this.onChangeSubjects}
                        ></Subjects>
                        <br />
                        <Technologies
                          technologies={this.state.technologies}
                          onChange={this.onChangeTechnologies}
                        ></Technologies>
                      </>
                    )}
                    <br />
                  </div>
                </div>
                <MySubmitButton
                  onClick={this.onClickSearch}
                  disabled={
                    !this.state.isGoodDate
                    // || (this.state.byDepartment &&
                    //   this.state.selectedTeacher === "" &&
                    //   this.state.selectedDepartment !== "")
                  }
                ></MySubmitButton>
              </div>
            </form>
            <br />
            <br />
          </>
        )}
        {this.state.isSearchProgress && <MySpinner label="Folyamatban a keresés..."></MySpinner>}
        {this.state.isSearchResult && (
          // PROP-ként ADOM ÁT a handleSubmit eredményét
          <SearchResult
            hideHeaderSearch={this.toogleHide}
            topicsToShow={this.state.searchResult}
          ></SearchResult>
        )}
      </>
    );
  }

  // KERESÉST MEGOLDÓ ALGORITMUS
  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.target);
    let element = event.target as HTMLInputElement;

    let searchResult: Topic[] = topics; // az összes témából indulunk ki - vagy csak az aktuális és tetszőleges kellene? infoba azt írtam oda

    // CÍM ALAPÚ KERESÉS
    let titleSearch = element.querySelector("#titleSearch");
    let titleWritten = (titleSearch as HTMLInputElement)?.value.trim();
    let searchResultByTitle: Topic[] = [];
    let wasTitleSearch: boolean = false;
    if (titleWritten.length > 0) {
      searchResultByTitle = searchResult.filter(
        (topic) => topic.title.toLowerCase().indexOf(titleWritten.toLowerCase()) !== -1
      );
      wasTitleSearch = true;
    }
    console.log("CÍMES KERESÉS UTÁNI TÉMÁK: ", searchResultByTitle);

    // TÉMATÍPUS KERESÉS
    let checkBoxDiv = element.querySelector("#chooseType");
    let checkBoxes = checkBoxDiv?.querySelectorAll('input[type="checkbox"]');
    let bscThesis = checkBoxes?.item(0).getAttribute("aria-checked");
    let bscTDK = checkBoxes?.item(1).getAttribute("aria-checked");
    let mscThesis = checkBoxes?.item(2).getAttribute("aria-checked");
    let mscTDK = checkBoxes?.item(3).getAttribute("aria-checked");
    let projekt = checkBoxes?.item(4).getAttribute("aria-checked");
    // ha az egyik benne van már elég - listák uniója kell
    let searchResult1: Topic[] = [];
    let searchResult2: Topic[] = [];
    let searchResult3: Topic[] = [];
    let searchResult4: Topic[] = [];
    let searchResult5: Topic[] = [];
    let wasTypeSearch: boolean = false;
    if (bscThesis && bscThesis !== "false") {
      searchResult1 = searchResult.filter((topic) => topic.type.includes(TopicType.BScThesis));
      wasTypeSearch = true;
    }
    if (bscTDK && bscTDK !== "false") {
      searchResult2 = searchResult.filter((topic) => topic.type.includes(TopicType.BScTDK));
      wasTypeSearch = true;
    }
    if (mscThesis && mscThesis !== "false") {
      searchResult3 = searchResult.filter((topic) => topic.type.includes(TopicType.MScThesis));
      wasTypeSearch = true;
    }
    if (mscTDK && mscTDK !== "false") {
      searchResult4 = searchResult.filter((topic) => topic.type.includes(TopicType.MScTDK));
      wasTypeSearch = true;
    }
    if (projekt && projekt !== "false") {
      searchResult5 = searchResult.filter((topic) => topic.type.includes(TopicType.Project));
      wasTypeSearch = true;
    }
    var set = new Set([
      ...searchResult1,
      ...searchResult2,
      ...searchResult3,
      ...searchResult4,
      ...searchResult5
    ]);
    let searchResultByType: Topic[] = [...set];
    console.log("TÍPUSOS KERESÉS UTÁNI TÉMÁK: ", searchResultByType);

    //////////////////////////// NYELV ALAPJÁN KERESÉS //////////////////////////////////////
    let checkBoxLanguage = element.querySelector("#chooseLanguage");
    let checkBoxesLanguage = checkBoxLanguage?.querySelectorAll('input[type="checkbox"]');
    let hungarian = checkBoxesLanguage?.item(0).getAttribute("aria-checked");
    let english = checkBoxesLanguage?.item(1).getAttribute("aria-checked");
    let searchResultL1: Topic[] = [];
    let searchResultL2: Topic[] = [];
    let wasLanguageSearch: boolean = false;
    if (hungarian && hungarian !== "false") {
      searchResultL1 = searchResult.filter((topic) => topic.language.includes(Language.Hungarian));
      wasLanguageSearch = true;
      console.log("magyart is");
    }
    if (english && english !== "false") {
      searchResultL2 = searchResult.filter((topic) => topic.language.includes(Language.English));
      wasLanguageSearch = true;
    }
    set = new Set([...searchResultL1, ...searchResultL2]);

    let searchResultByLanguage: Topic[] = [...set];
    console.log("NYELVES KERESÉS UTÁNI TÉMÁK: ", searchResultByLanguage);

    // más ha alapból üres s más ha azért üres mert a filter miatt üres lett!

    // TANSZÉK ALAPJÁN KERESNI
    let wasSearchByDepartment = false;
    let searchResultByDepartment: Topic[] = [];
    if (this.state.selectedDepartment !== "" && this.state.selectedTeacher === "") {
      console.log("CSAK TANSZÉK ALAPJÁN KERESÜNK: ", this.state.selectedDepartment);
      const teacherIds = teachersToDepartments.get(this.state.selectedDepartment);
      searchResultByDepartment = searchResult.filter((topic) =>
        teacherIds?.includes(topic.teacherId)
      );
      wasSearchByDepartment = true;
    }
    console.log("TANSZÉKES KERESÉS UTÁNI TÉMÁK: ", searchResultByDepartment);

    /// KERESÉS TANÁR ALAPJÁN
    let searchResultByTeacher: Topic[] = [];
    let wasSearchByTeacher = false;
    if (this.state.byDepartment && this.state.selectedTeacher) {
      console.log("A témavezetőtanár, akit keresünk: ", this.state.selectedTeacher);
      searchResultByTeacher = searchResult.filter(
        (topic) => topic.teacherId === this.state.selectedTeacher
      );
      wasSearchByTeacher = true;
    }
    if (!this.state.byDepartment && this.state.selectedTeacher2.length > 0) {
      console.log("VÁLASZTOTT TANÁROK: ", this.state.selectedTeacher2);
      searchResultByTeacher = searchResult.filter((topic) =>
        this.state.selectedTeacher2.includes(topic.teacherId)
      );
      wasSearchByTeacher = true;
    }
    console.log("TANÁROS KERESÉS UTÁNI TÉMÁK: ", searchResultByTeacher);

    // KERESÉS FÉLÉV ALAPJÁN
    let wasSearchBySemester = false;
    let searchResultBySemester: Topic[] = [];
    if (this.state.selectedValidity === "every") {
      wasSearchBySemester = true;
      searchResultBySemester = searchResult.filter((topic) => topic.schoolSemester === null);
    }
    if (this.state.selectedValidity === "given" && this.state.year !== "") {
      wasSearchBySemester = true;
      let year = "20" + this.state.year.substring(0, 2);
      let yearInt = parseInt(year);
      let half: Semester =
        this.state.selectedSemester === "autumn" ? Semester.Autumn : Semester.Spring;
      searchResultBySemester = searchResult.filter(
        (topic) => topic.schoolSemester?.year === yearInt && topic.schoolSemester.half === half
      );
    }
    console.log("FÉLÉVES KERESÉS UTÁNI TÉMÁK: ", searchResultBySemester);

    //KERESÉS TÁRGYAK ALAPJÁN
    let wasSearchBySubjects = false;
    let searchResultBySubjects: Topic[] = [];
    if (this.state.subjects.length > 0) {
      wasSearchBySubjects = true;
      searchResultBySubjects = searchResult.filter(
        (topic) =>
          topic.connectedSubjectIds.filter((subjectId) => this.state.subjects.includes(subjectId))
            .length > 0
      );
    }
    console.log("TANTÁRGYAS KERESÉS UTÁNI TÉMÁK: ", searchResultBySubjects);

    //KERESÉS TECHNOLÓGIÁK ALAPJÁN
    let wasSearchByTechnologies = false;
    let searchResultByTechnologies: Topic[] = [];
    if (this.state.technologies.length > 0) {
      wasSearchByTechnologies = true;
      searchResultByTechnologies = searchResult.filter(
        (topic) =>
          topic.connectedTechnologyIds.filter((technologyId) =>
            this.state.technologies.includes(technologyId)
          ).length > 0
      );
    }
    console.log("TECHNOLÓGIÁS KERESÉS UTÁNI TÉMÁK: ", searchResultByTechnologies);

    //////////////////////////////////////////////////////////////////////
    //////////////// EREDMÉNY: az összes metszete
    if (searchResultByTitle.length > 0 || wasTitleSearch) {
      searchResult = searchResultByTitle;
      console.log("VOLT CÍM");
    }
    if (searchResultByType.length > 0 || wasTypeSearch) {
      // amik közösek eddig
      searchResult = searchResult.filter((value) => searchResultByType.includes(value));
      console.log("VOLT TÍPUS");
    }
    if (searchResultByLanguage.length > 0 || wasLanguageSearch) {
      searchResult = searchResult.filter((value) => searchResultByLanguage.includes(value));
      console.log("VOLT NYELV");
    }
    if (searchResultByTeacher.length > 0 || wasSearchByTeacher) {
      searchResult = searchResult.filter((value) => searchResultByTeacher.includes(value));
      console.log("VOLT TANÁR");
    }
    if (searchResultByDepartment.length > 0 || wasSearchByDepartment) {
      searchResult = searchResult.filter((value) => searchResultByDepartment.includes(value));
      console.log("VOLT TANSZÉK");
    }
    if (searchResultBySemester.length > 0 || wasSearchBySemester) {
      searchResult = searchResult.filter((value) => searchResultBySemester.includes(value));
      console.log("VOLT FÉLÉV");
    }
    if (searchResultBySubjects.length > 0 || wasSearchBySubjects) {
      searchResult = searchResult.filter((value) => searchResultBySubjects.includes(value));
      console.log("VOLT TANTÁRGY");
    }
    if (searchResultByTechnologies.length > 0 || wasSearchByTechnologies) {
      searchResult = searchResult.filter((value) => searchResultByTechnologies.includes(value));
      console.log("VOLT TECHNOLÓGIA");
    }

    this.setState({
      ...this.state,
      searchResult: searchResult
    });
  }
}

export default SearchPage;
