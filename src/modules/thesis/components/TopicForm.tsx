import * as React from "react";
import { TextField, MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { IDropdownStyles } from "office-ui-fabric-react/lib/Dropdown";
import { PrimaryButton, IIconProps, DefaultButton, IComboBoxOption } from "office-ui-fabric-react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Language, Semester, Topic, TopicType } from "../model/topics.model";
import { Redirect } from "react-router";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { ComboBox } from "office-ui-fabric-react/lib/index";
import { IComboBoxStyles } from "@fluentui/react";
import { rootPath } from "../path";
import { exampleSubjects, exampleTechnologies } from "../exampleData";

// STÍLUSOK
const stackTokens = { childrenGap: 5 };
const stackStyles: Partial<IStackStyles> = { root: { width: "100%" } };
const stackStyles2: Partial<IStackStyles> = {
  root: { width: "70%", margin: "auto", marginTop: "10px" }
};
const horizontalChoiceGroupStyles = {
  flexContainer: { display: "flex", flexDirection: "row" },
  marginTop: "0px",
  paddingTop: "0px"
};
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdownItemsWrapper: { overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }
};
const comboboxStyles2: Partial<IComboBoxStyles> = {
  root: { marginBottom: "10px" },
  optionsContainerWrapper: {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "300px",
    width: 300
  }
};

// DROPDOWN ELEMEK
let subjectOptions: IComboBoxOption[] = [];
exampleSubjects.forEach((subj) => subjectOptions.push({ key: subj.neptunId, text: subj.name }));

subjectOptions = subjectOptions.sort((a, b) => (a.text > b.text ? 1 : -1));

let technologyOptions: IComboBoxOption[] = [];
exampleTechnologies.forEach((tech) => technologyOptions.push({ key: tech.id, text: tech.name }));

technologyOptions = technologyOptions.sort((a, b) => (a.text > b.text ? 1 : -1));

// CHOICEGROUP ELEMEK
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

type MissingData = {
  title: boolean;
  description: boolean;
  semester: boolean;
  places: boolean;
  language1: boolean;
  language2: boolean;
  type1: boolean;
  type2: boolean;
  type3: boolean;
  type4: boolean;
  type5: boolean;
  every_semester: boolean;
  given_semester: boolean;
};

type TopicData = {
  title: string;
  description: string;
  everySemester: boolean;
  autumn: boolean;
  year: string;
  numPlaces: number;
  types: TopicType[];
  languages: Language[];
  connectedTechnologies: string[];
  connectedSubjects: string[];
};

type State = {
  missingData: MissingData;
  redirectAfterSave: boolean;
  values: TopicData;
};

const publishIcon: IIconProps = { iconName: "PublishContent" };
const saveIcon: IIconProps = { iconName: "Save" };

interface IMyProps {}
interface IReactRouterParams {
  id?: string;
}

class TopicForm extends React.Component<IMyProps & RouteComponentProps<IReactRouterParams>, State> {
  private isTopicGiven: boolean = false;

  constructor(props: any) {
    super(props);

    if (this.props.match.params.id) {
      console.log("van id");
      this.isTopicGiven = true;
    } else {
      console.log("nincs id");
    }

    // mintatéma melyet betöltök módosításkor
    let exampleTopic: Topic = {
      id: "a",
      type: [TopicType.BScTDK, TopicType.MScTDK],
      title: "MINTA CÍM",
      description: "MINTA LEÍRÁS",
      teacherId: "1",
      connectedSubjectIds: ["Mesterséges intelligencia"],
      connectedTechnologyIds: ["JAVA", "React"],
      numberOfPlaces: 10,
      schoolSemester: {
        year: 2021,
        half: Semester.Spring
      },
      appliedStudentIds: [],
      language: [Language.English]
    };

    if (this.isTopicGiven) {
      // most beállítok egy random témát, de majd DB-ből jön URL id alapján
      this.state = {
        redirectAfterSave: false,
        values: {
          title: exampleTopic.title,
          description: exampleTopic.description,
          everySemester: exampleTopic.schoolSemester === null,
          autumn:
            exampleTopic.schoolSemester !== null &&
            exampleTopic.schoolSemester.half === Semester.Autumn,
          year: exampleTopic.schoolSemester
            ? exampleTopic.schoolSemester.year.toString().substring(2) +
              "/" +
              (exampleTopic.schoolSemester.year + 1).toString().substring(2)
            : "",
          numPlaces: exampleTopic.numberOfPlaces,
          types: exampleTopic.type,
          languages: exampleTopic.language,
          connectedTechnologies: exampleTopic.connectedTechnologyIds,
          connectedSubjects: exampleTopic.connectedSubjectIds
        },
        missingData: {
          title: false,
          description: false,
          semester: exampleTopic.schoolSemester === null,
          places: false,
          language1: !exampleTopic.language.includes(Language.English),
          language2: !exampleTopic.language.includes(Language.Hungarian),
          type1: !exampleTopic.type.includes(TopicType.BScThesis),
          type2: !exampleTopic.type.includes(TopicType.BScTDK),
          type3: !exampleTopic.type.includes(TopicType.MScThesis),
          type4: !exampleTopic.type.includes(TopicType.MScTDK),
          type5: !exampleTopic.type.includes(TopicType.Project),
          every_semester: exampleTopic.schoolSemester === null,
          given_semester: exampleTopic.schoolSemester !== null
        }
      };
    } else {
      this.state = {
        missingData: {
          title: true,
          description: true,
          semester: true,
          places: true,
          language1: true,
          language2: false,
          type1: false,
          type2: true,
          type3: true,
          type4: true,
          type5: true,
          every_semester: true,
          given_semester: false
        },
        redirectAfterSave: false,
        values: {
          title: "",
          description: "",
          everySemester: false,
          autumn: true,
          year: "",
          numPlaces: -1,
          types: [TopicType.BScThesis],
          languages: [Language.Hungarian],
          connectedTechnologies: [],
          connectedSubjects: []
        }
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getErrorTitle = this.getErrorTitle.bind(this);
    this.getErrorDescription = this.getErrorDescription.bind(this);
    this.getErrorSemester = this.getErrorSemester.bind(this);
    this.getErrorNumPlaces = this.getErrorNumPlaces.bind(this);
    this.changeType1 = this.changeType1.bind(this);
    this.changeType2 = this.changeType2.bind(this);
    this.changeType3 = this.changeType3.bind(this);
    this.changeType4 = this.changeType4.bind(this);
    this.changeType5 = this.changeType5.bind(this);
    this.changeLanguage1 = this.changeLanguage1.bind(this);
    this.changeLanguage2 = this.changeLanguage2.bind(this);
    this.changeSemester = this.changeSemester.bind(this);
  }

  private getErrorTitle = (value: string): string => {
    if (value.trim().length >= 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          title: false
        }
      }));
      console.log(this.state);
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          title: true
        }
      }));
      return `Cím megadása kötelező!`;
    }
  };

  private getErrorDescription = (value: string): string => {
    if (value.trim().length >= 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          description: false
        }
      }));
      console.log(this.state);
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          description: true
        }
      }));
      return `Leírás megadása kötelező!`;
    }
  };

  private getErrorSemester = (value: string): string => {
    let first = parseInt(value.substring(2, 4));
    let second = parseInt(value.substring(5, 7));
    const regex = new RegExp("[0-9][0-9][0-9][0-9]/[0-9][0-9]");
    let currentYear = new Date().getFullYear();
    let enteredValueString = value.substring(0, 2) + value.substring(5, 7);
    console.log(value);
    let enteredValue = parseInt(enteredValueString);
    if (value === "20__/__") {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      return "Tanév megadása kötelező!";
    }
    if (!regex.test(value)) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      return "Tanév formátuma nem helyes szintaktikailag! Példa helyes formátumra: 2020/21";
    }
    if (second !== first + 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      console.log(this.state);
      return "Tanév formátuma nem helyes szemantikailag! Példa helyes formátumra: 2020/21";
    }
    if (enteredValue < currentYear) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      return "Tanév értéke nem lehet kisebb mint a jelenlegi tanév.";
    }
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        semester: false
      }
    }));
    console.log(this.state);
    return "";
  };

  private getErrorNumPlaces = (value: string): string => {
    if (!isNaN(parseInt(value))) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          places: false
        }
      }));
      console.log(this.state);
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          places: true
        }
      }));
      return `Helyek számának megadása kötelező!`;
    }
    //return value.length >= 1 ? "" : `Helyek számának megadása kötelező!`;
  };

  private changeType1 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type1: !state.missingData.type1
      },
      values: {
        ...this.state.values,
        types: this.state.values.types.includes(TopicType.BScThesis)
          ? this.state.values.types.filter((type) => type !== TopicType.BScThesis)
          : [...this.state.values.types, TopicType.BScThesis]
      }
    }));
  };

  private changeType2 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type2: !state.missingData.type2
      },
      values: {
        ...this.state.values,
        types: this.state.values.types.includes(TopicType.BScTDK)
          ? this.state.values.types.filter((type) => type !== TopicType.BScTDK)
          : [...this.state.values.types, TopicType.BScTDK]
      }
    }));
  };

  private changeType3 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type3: !state.missingData.type3
      },
      values: {
        ...this.state.values,
        types: this.state.values.types.includes(TopicType.MScThesis)
          ? this.state.values.types.filter((type) => type !== TopicType.MScThesis)
          : [...this.state.values.types, TopicType.MScThesis]
      }
    }));
  };

  private changeType4 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type4: !state.missingData.type4
      },
      values: {
        ...this.state.values,
        types: this.state.values.types.includes(TopicType.MScTDK)
          ? this.state.values.types.filter((type) => type !== TopicType.MScTDK)
          : [...this.state.values.types, TopicType.MScTDK]
      }
    }));
  };

  private changeType5 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type5: !state.missingData.type5
      },
      values: {
        ...this.state.values,
        types: this.state.values.types.includes(TopicType.Project)
          ? this.state.values.types.filter((type) => type !== TopicType.Project)
          : [...this.state.values.types, TopicType.Project]
      }
    }));
  };

  private changeLanguage1 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        language1: !state.missingData.language1
      },
      values: {
        ...this.state.values,
        languages: this.state.values.languages.includes(Language.English)
          ? this.state.values.languages.filter((type) => type !== Language.English)
          : [...this.state.values.languages, Language.English]
      }
    }));
  };

  private changeLanguage2 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        language2: !state.missingData.language2
      },
      values: {
        ...this.state.values,
        languages: this.state.values.languages.includes(Language.Hungarian)
          ? this.state.values.languages.filter((type) => type !== Language.Hungarian)
          : [...this.state.values.languages, Language.Hungarian]
      }
    }));
  };

  private changeSemester = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        semester: true,
        every_semester: !state.missingData.every_semester,
        given_semester: !state.missingData.given_semester
      },
      values: {
        ...this.state.values,
        everySemester: !this.state.values.everySemester
      }
    }));
  };

  render() {
    let redirectToPublishedThesis: boolean = this.state.redirectAfterSave;

    if (redirectToPublishedThesis) {
      return <Redirect to="/thesis/publishedThesis" />;
    }

    return (
      <div style={{ width: "100%" }}>
        <Stack styles={stackStyles2}>
          <h2>Téma {this.isTopicGiven ? <>módosítása</> : <>kiírása</>}</h2>
          <form onSubmit={this.handleSubmit}>
            <Stack tokens={stackTokens} styles={stackStyles}>
              <TextField
                label="Cím"
                name="Cím"
                required
                onGetErrorMessage={this.getErrorTitle}
                validateOnLoad={false}
                value={this.state.values.title}
                onChange={(ev, nTitle) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, title: nTitle ? nTitle : "" }
                  })
                }
              />
              <TextField
                label="Leírás"
                name="Leírás"
                multiline
                rows={3}
                required
                onGetErrorMessage={this.getErrorDescription}
                validateOnLoad={false}
                value={this.state.values.description}
                onChange={(ev, nDesc) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, description: nDesc ? nDesc : "" }
                  })
                }
              />

              <Text style={{ fontWeight: 500, marginTop: "10px" }}>
                Téma érvényességi ideje <span style={{ color: "rgb(164, 38, 44)" }}> *</span>
              </Text>
              <Stack style={{ marginBottom: "10px", marginTop: "5px" }}>
                <ChoiceGroup
                  styles={horizontalChoiceGroupStyles}
                  name="everyorgiven"
                  defaultSelectedKey={this.state.values.everySemester ? "every" : "given"}
                  options={mainSemesters}
                  required={true}
                  onChange={this.changeSemester}
                />
              </Stack>
              <div className="ms-Grid" dir="ltr">
                {!this.state.values.everySemester && (
                  <>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm6">
                        <MaskedTextField
                          label="Tanév"
                          name="Tanév"
                          mask="2099/99"
                          required
                          onGetErrorMessage={this.getErrorSemester}
                          validateOnLoad={false}
                          value={this.state.values.year}
                          onChange={(ev, nValue) => {
                            this.setState({
                              ...this.state,
                              values: {
                                ...this.state.values,
                                year: nValue ? nValue.substring(2) : ""
                              }
                            });
                          }}
                        />
                      </div>
                      <div className="ms-Grid-col ms-sm6" style={{ paddingTop: "10px" }}>
                        <Text style={{ fontWeight: 500, paddingTop: "60px", marginBottom: "0px" }}>
                          Félév <span style={{ color: "rgb(164, 38, 44)" }}> *</span>
                        </Text>
                        <ChoiceGroup
                          styles={horizontalChoiceGroupStyles}
                          name="autumnorspring"
                          defaultSelectedKey={this.state.values.autumn ? "autumn" : "spring"}
                          options={semesters}
                          required={true}
                          onChange={() => {
                            this.setState({
                              ...this.state,
                              values: { ...this.state.values, autumn: !this.state.values.autumn }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <br />
                  </>
                )}

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <Text style={{ fontWeight: 500 }}>
                      Téma jellege <span style={{ color: "rgb(164, 38, 44)" }}> *</span>
                    </Text>
                    <Stack
                      tokens={stackTokens}
                      id="chooseType"
                      style={{ paddingLeft: "5px", marginTop: "5px" }}
                    >
                      <Checkbox
                        name="bsc_szakdoga"
                        label="Bsc szakdolgozati"
                        title="Bsc szakdolgozati"
                        checked={this.state.values.types.includes(TopicType.BScThesis)}
                        onChange={this.changeType1}
                      />
                      <Checkbox
                        name="bsc_tdk"
                        label="Bsc TDK"
                        title="Bsc TDK"
                        onChange={this.changeType2}
                        checked={this.state.values.types.includes(TopicType.BScTDK)}
                      />
                      <Checkbox
                        name="msc_szakdoga"
                        label="Msc szakdolgozati"
                        title="Msc szakdolgozati"
                        onChange={this.changeType3}
                        checked={this.state.values.types.includes(TopicType.MScThesis)}
                      />
                      <Checkbox
                        name="msc_tdk"
                        label="Msc TDK"
                        title="Msc TDK"
                        onChange={this.changeType4}
                        checked={this.state.values.types.includes(TopicType.MScTDK)}
                      />
                      <Checkbox
                        name="project"
                        label="Projekt"
                        title="Projekt"
                        onChange={this.changeType5}
                        checked={this.state.values.types.includes(TopicType.Project)}
                      />
                    </Stack>
                    {this.state.missingData.type1 &&
                    this.state.missingData.type2 &&
                    this.state.missingData.type3 &&
                    this.state.missingData.type4 &&
                    this.state.missingData.type5 ? (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "rgb(164, 38, 44)",
                          marginTop: "7px",
                          display: "inline-block"
                        }}
                      >
                        Téma jellegének megadása kötelező!
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Text style={{ fontWeight: 500 }}>
                      Témaírás nyelve<span style={{ color: "rgb(164, 38, 44)" }}> *</span>
                    </Text>
                    <Stack
                      tokens={stackTokens}
                      id="chooseLanguage"
                      style={{ paddingLeft: "5px", marginTop: "5px" }}
                    >
                      <Checkbox
                        name="english"
                        label="angol"
                        title="angol"
                        onChange={this.changeLanguage1}
                        checked={this.state.values.languages.includes(Language.English)}
                      />
                      <Checkbox
                        name="hungarian"
                        label="magyar"
                        title="magyar"
                        defaultChecked
                        onChange={this.changeLanguage2}
                        checked={this.state.values.languages.includes(Language.Hungarian)}
                      />
                    </Stack>
                    {this.state.missingData.language1 && this.state.missingData.language2 ? (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          color: "#A4262C",
                          marginTop: "7px",
                          display: "inline-block"
                        }}
                      >
                        Témaírás nyelvének megadása kötelező!
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <TextField
                label="Helyek száma"
                type="number"
                min="1"
                required
                name="numberofplaces"
                onGetErrorMessage={this.getErrorNumPlaces}
                validateOnLoad={false}
                value={
                  this.state.values.numPlaces === -1 ? "" : this.state.values.numPlaces.toString()
                }
                onChange={(ev, nValue) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, numPlaces: nValue ? parseInt(nValue) : -1 }
                  })
                }
              />
              <ComboBox
                placeholder="Válassza ki a kapcsolódó tantárgyakat..."
                label="Tantárgyak"
                multiSelect
                styles={dropdownStyles}
                options={subjectOptions}
                selectedKey={this.state.values.connectedSubjects}
                onChange={(ev, option) => {
                  this.setState({
                    ...this.state,
                    values: {
                      ...this.state.values,
                      connectedSubjects: option?.selected
                        ? [...this.state.values.connectedSubjects, option.key.toString()]
                        : this.state.values.connectedSubjects.filter((k) => k !== option?.key)
                    }
                  });
                }}
              />
              <ComboBox
                label="Technológiák"
                placeholder="Válassza ki a kapcsolódó technológiákat..."
                multiSelect
                allowFreeform
                autoComplete="on"
                options={technologyOptions}
                styles={comboboxStyles2}
                selectedKey={this.state.values.connectedTechnologies}
                onChange={(ev, option) => {
                  this.setState({
                    ...this.state,
                    values: {
                      ...this.state.values,
                      connectedTechnologies: option?.selected
                        ? [...this.state.values.connectedTechnologies, option.key.toString()]
                        : this.state.values.connectedTechnologies.filter((k) => k !== option?.key)
                    }
                  });
                }}
              />
              {this.isTopicGiven ? (
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <PrimaryButton
                      text="Mentés"
                      type="submit"
                      iconProps={saveIcon}
                      disabled={
                        this.state.missingData.title ||
                        this.state.missingData.description ||
                        this.state.missingData.places ||
                        (this.state.missingData.language1 && this.state.missingData.language2) ||
                        (this.state.missingData.type1 &&
                          this.state.missingData.type2 &&
                          this.state.missingData.type3 &&
                          this.state.missingData.type4 &&
                          this.state.missingData.type5)
                      }
                      style={{ position: "relative", left: "50%" }}
                    ></PrimaryButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Link to={rootPath + "/publishedThesis"}>
                      <DefaultButton
                        text="Mégse"
                        style={{ position: "relative", left: "20%" }}
                      ></DefaultButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <PrimaryButton
                  text="Meghirdetés"
                  type="submit"
                  iconProps={publishIcon}
                  allowDisabledFocus
                  disabled={
                    this.state.missingData.title ||
                    this.state.missingData.description ||
                    (this.state.missingData.every_semester && this.state.missingData.semester) ||
                    this.state.missingData.places ||
                    (this.state.missingData.language1 && this.state.missingData.language2) ||
                    (this.state.missingData.type1 &&
                      this.state.missingData.type2 &&
                      this.state.missingData.type3 &&
                      this.state.missingData.type4 &&
                      this.state.missingData.type5)
                  }
                />
              )}

              <br />
            </Stack>
          </form>
        </Stack>
      </div>
    );
  }

  // új téma összeállítása
  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Beküldték");
    let year = "20" + this.state.values.year.substring(0, 2);
    let yearInNumber = parseInt(year);

    // új téma összeállítása
    let newTopic: Topic = {
      id: "valami", // TODO
      type: this.state.values.types,
      title: this.state.values.title,
      description: this.state.values.description,
      teacherId: "valami", // TODO
      connectedSubjectIds: this.state.values.connectedSubjects,
      connectedTechnologyIds: this.state.values.connectedTechnologies,
      numberOfPlaces: this.state.values.numPlaces,
      schoolSemester: this.state.values.everySemester
        ? null
        : {
            year: yearInNumber,
            half: this.state.values.autumn ? Semester.Autumn : Semester.Spring
          },
      appliedStudentIds: [],
      language: this.state.values.languages
    };
    console.log(newTopic);

    //visszairányítás a publishedthesis-ekhez
    this.setState({
      ...this.state,
      redirectAfterSave: true
    });
  }
}

export default withRouter(TopicForm);
