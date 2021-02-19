import * as React from "react";
import { TextField, MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { PrimaryButton, IIconProps } from "office-ui-fabric-react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Language, Semester, TopicType } from "../model/topics.model";
import { Redirect } from "react-router";

const stackTokens = { childrenGap: 5 };
const stackStyles: Partial<IStackStyles> = { root: { width: "100%" } };
const stackStyles2: Partial<IStackStyles> = {
  root: { width: "70%", margin: "auto" }
};
const horizontalChoiceGroupStyles = {
  flexContainer: { display: "flex", flexDirection: "row" },
  marginTop: "0px",
  paddingTop: "0px"
};
const columnProps: Partial<IStackProps> = {
  // tokens: { childrenGap: 5 },
  styles: { root: { width: "100%" } }
};

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

const semesters: IChoiceGroupOption[] = [
  { key: "autumn", text: "Ősz", styles: { root: { marginRight: "10px", marginTop: "0px" } } },
  { key: "spring", text: "Tavasz", styles: { root: { marginTop: "0px" } } }
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
};

type State = {
  missingData: MissingData;
  values: Values;
  redirectAfterSave: boolean;
};

type Prop = {
  values?: Values;
};

type Values = {
  title: string;
  description: string;
  numOfPlaces: number;
  startYear: number;
  // TODO: félév hónapja
  // TODO: tantárgyak
  // TODO: technológiák
  // TODO: téma jellege
  // TODO: témaírás nyelve
};

const publishIcon: IIconProps = { iconName: "PublishContent" };
const saveIcon: IIconProps = { iconName: "Save" };

class TopicForm extends React.Component<Prop, State> {
  private choiceGroupRef: any;
  private bscThesisRef: any;
  private bscTdkRef: any;
  private mscThesisRef: any;
  private mscTdkRef: any;
  private hungarianRef: any;
  private englishRef: any;
  private subjectsRef: any;
  private technologiesRef: any;
  private plusOneYear: string;
  private projectRef: any;

  // nem működik megfelelően - valahogy így kell majd elkérnem s akkor az adatbázisból elkérni a megfelelő id-jú témát
  // componentDidMount() {
  //   const id = (this.props.match.params as any).id;
  //   console.log(id);
  //   // ha ez nem undefined, akkor id alapján le tudnám kérni a témát nem kellene paraméterben megadni
  // }

  constructor(props: any) {
    super(props);
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
        type5: true
      },
      values: {
        title: "",
        description: "",
        numOfPlaces: 0,
        startYear: 0
      },
      redirectAfterSave: false
    };
    // ha valamelyik nincs megadva akkor egyiket sem állítja be,
    // de jobb lenne ha mindet kötelező lenne megadni
    // olyan kellene hogy vagy megadok propot vagy nem
    if (this.props.values) {
      console.log("itt");
      this.state = {
        ...this.state,
        missingData: {
          ...this.state.missingData,
          title: false,
          description: false,
          places: false,
          semester: false
        },
        values: this.props?.values
      };
    }
    this.plusOneYear = (this.state.values.startYear + 1).toString().substring(2);
    console.log(this.plusOneYear);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.choiceGroupRef = React.createRef();
    this.bscThesisRef = React.createRef();
    this.bscTdkRef = React.createRef();
    this.mscThesisRef = React.createRef();
    this.mscTdkRef = React.createRef();
    this.hungarianRef = React.createRef();
    this.englishRef = React.createRef();
    this.subjectsRef = React.createRef();
    this.technologiesRef = React.createRef();
    this.projectRef = React.createRef();

    console.log(this.state.values);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Beküldték");
    console.log(event.target);
    const fields = Array.prototype.slice
      .call(event.target)
      .filter((el) => el.name)
      .filter((el) => el.value !== "on")
      .reduce(
        (form, el) => ({
          ...form,
          [el.name]: el.value
        }),
        {}
      );
    console.log(fields);
    console.log(this.choiceGroupRef.current.checkedOption);
    console.log("BSC szakdoga: ", this.bscThesisRef.current.checked);
    console.log("BSC tdk: ", this.bscTdkRef.current.checked);
    console.log("MSC szakdoga: ", this.mscThesisRef.current.checked);
    console.log("MSC tdk: ", this.mscTdkRef.current.checked);
    console.log("Projekt: ", this.projectRef.current.checked);
    console.log("Magyar nyelvű:", this.hungarianRef.current.checked);
    console.log("Angol nyelvű: ", this.englishRef.current.checked);
    console.log("Tantárgyak: ", this.subjectsRef.current.selectedOptions);
    console.log("Technológiák: ", this.technologiesRef.current.selectedOptions);

    // az összeállított téma
    let types: TopicType[] = [];
    if (this.bscThesisRef.current.checked) {
      types.push(TopicType.BScThesis);
    }
    if (this.bscTdkRef.current.checked) {
      types.push(TopicType.BScTDK);
    }
    if (this.mscThesisRef.current.checked) {
      types.push(TopicType.MScThesis);
    }
    if (this.mscTdkRef.current.cheched) {
      types.push(TopicType.MScTDK);
    }
    if (this.projectRef.current.checked) {
      types.push(TopicType.Project);
    }

    let languages: Language[] = [];
    if (this.hungarianRef.current.checked) {
      languages.push(Language.Hungarian);
    }
    if (this.englishRef.current.cheched) {
      languages.push(Language.English);
    }

    let semester = fields["Tanév"];
    let year = parseInt(semester.substring(0, 4));
    let half =
      this.choiceGroupRef.current.checkedOption.key === "autumn"
        ? Semester.Autumn
        : Semester.Spring;

    let subjectIds: string[] = this.subjectsRef.current.selectedOptions.map(
      (subject: any) => subject.key
    );

    let technologyIds: string[] = this.technologiesRef.current.selectedOptions.map(
      (technology: any) => technology.key
    );

    let newTopic = {
      // id: string;
      type: types,
      title: fields["Cím"],
      description: fields["Leírás"],
      // teacherId: string;
      connectedSubjectIds: subjectIds,
      connectedTechnologyIds: technologyIds,
      numberOfPlaces: parseInt(fields["numberofplaces"]),
      schoolSemester: {
        year: year,
        half: half
      },
      appliedStudentIds: [],
      language: languages
    };
    console.log(newTopic);

    //visszairányítás a publishedthesis-ekhez
    this.setState({
      ...this.state,
      redirectAfterSave: true
    });
  }

  getErrorMessage = (value: string): string => {
    if (value.length >= 1) {
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

  getErrorDescription = (value: string): string => {
    if (value.length >= 1) {
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

  getErrorSemester = (value: string): string => {
    console.log(value);
    let first = parseInt(value.substring(2, 4));
    let second = parseInt(value.substring(5, 7));
    const regex = new RegExp("[0-9][0-9][0-9][0-9]/[0-9][0-9]");
    if (!regex.test(value)) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      return "Tanév formátuma nem helyes szintaktikailag! Példa helyes formátumra: 2020/21";
    } else if (second !== first + 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: true
        }
      }));
      console.log(this.state);
      return "Tanév formátuma nem helyes szemantikailag! Példa helyes formátumra: 2020/21";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          semester: false
        }
      }));
      console.log(this.state);
      return "";
    }
  };

  getErrorNumPlaces = (value: string): string => {
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

  changeType1 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type1: !state.missingData.type1
      }
    }));
  };
  changeType2 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type2: !state.missingData.type2
      }
    }));
  };
  changeType3 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type3: !state.missingData.type3
      }
    }));
  };
  changeType4 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type4: !state.missingData.type4
      }
    }));
  };
  changeType5 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        type5: !state.missingData.type5
      }
    }));
  };
  changeLanguage1 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        language1: !state.missingData.language1
      }
    }));
    console.log(this.state);
  };
  changeLanguage2 = () => {
    this.setState((state) => ({
      ...this.state,
      missingData: {
        ...state.missingData,
        language2: !state.missingData.language2
      }
    }));
  };

  render() {
    let redirectToPublishedThesis: boolean = this.state.redirectAfterSave;

    if (redirectToPublishedThesis) {
      return <Redirect to="/publishedThesis" />;
    }

    return (
      <div style={{ width: "100%" }}>
        <Stack styles={stackStyles2}>
          <h2>Téma {this.props.values ? <>módosítása</> : <>kiírása</>}</h2>
          <form onSubmit={this.handleSubmit}>
            <Stack tokens={stackTokens} styles={stackStyles}>
              <TextField
                label="Cím"
                name="Cím"
                required
                onGetErrorMessage={this.getErrorMessage}
                validateOnLoad={false}
                value={this.state.values.title}
                onChange={(e) => {
                  this.setState((state) => ({
                    ...state,
                    values: {
                      ...state.values,
                      title: (e.target as HTMLInputElement).value
                    }
                  }));
                }}
              />
              <TextField
                label="Leírás"
                value={this.state.values.description}
                name="Leírás"
                multiline
                rows={3}
                required
                onGetErrorMessage={this.getErrorDescription}
                validateOnLoad={false}
                onChange={(e) => {
                  this.setState((state) => ({
                    ...state,
                    values: {
                      ...state.values,
                      description: (e.target as HTMLInputElement).value
                    }
                  }));
                }}
              />
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <MaskedTextField
                      label="Tanév"
                      name="Tanév"
                      mask="2099/99"
                      required
                      onGetErrorMessage={this.getErrorSemester}
                      validateOnLoad={false}
                      value={
                        this.state.values.startYear === 0
                          ? ""
                          : this.state.values.startYear.toString().substring(2) +
                            "/" +
                            this.plusOneYear
                      }
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm6" style={{ paddingTop: "10px" }}>
                    <Text style={{ fontWeight: 500, paddingTop: "60px", marginBottom: "0px" }}>
                      Félév <span style={{ color: "rgb(164, 38, 44)" }}> *</span>
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
                <br />

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <Text style={{ fontWeight: 500 }}>
                      Téma jellege <span style={{ color: "rgb(164, 38, 44)" }}> *</span>
                    </Text>
                    <Stack tokens={stackTokens} id="chooseType" style={{ paddingLeft: "5px" }}>
                      <Checkbox
                        name="bsc_szakdoga"
                        label="Bsc szakdolgozati"
                        title="Bsc szakdolgozati"
                        defaultChecked
                        componentRef={this.bscThesisRef}
                        onChange={this.changeType1}
                      />
                      <Checkbox
                        name="bsc_tdk"
                        label="Bsc TDK"
                        title="Bsc TDK"
                        componentRef={this.bscTdkRef}
                        onChange={this.changeType2}
                      />
                      <Checkbox
                        name="msc_szakdoga"
                        label="Msc szakdolgozati"
                        title="Msc szakdolgozati"
                        onChange={this.changeType3}
                        componentRef={this.mscThesisRef}
                      />
                      <Checkbox
                        name="msc_tdk"
                        label="Msc TDK"
                        title="Msc TDK"
                        componentRef={this.mscTdkRef}
                        onChange={this.changeType4}
                      />
                      <Checkbox
                        name="project"
                        label="Projekt"
                        title="Projekt"
                        componentRef={this.projectRef}
                        onChange={this.changeType5}
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
                    <Stack tokens={stackTokens} id="chooseLanguage" style={{ paddingLeft: "5px" }}>
                      <Checkbox
                        name="english"
                        label="angol"
                        title="angol"
                        onChange={this.changeLanguage1}
                        componentRef={this.englishRef}
                      />
                      <Checkbox
                        name="hungarian"
                        label="magyar"
                        title="magyar"
                        defaultChecked
                        onChange={this.changeLanguage2}
                        componentRef={this.hungarianRef}
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
                  this.state.values.numOfPlaces === 0
                    ? ""
                    : this.state.values.numOfPlaces.toString()
                }
                onChange={(e) => {
                  this.setState((state) => ({
                    ...state,
                    values: {
                      ...state.values,
                      numOfPlaces: parseInt((e.target as HTMLInputElement).value)
                    }
                  }));
                }}
              />
              <Dropdown
                //name="subjects"
                placeholder="Válassza ki a kapcsolódó tantárgyakat..."
                label="Tantárgyak"
                multiSelect
                options={options}
                //styles={dropdownStyles}
                componentRef={this.subjectsRef}
              />
              <Dropdown
                placeholder="Válassza ki a kapcsolódó technológiákat..."
                label="Technológiák"
                multiSelect
                options={options2}
                style={{ marginBottom: "10px" }}
                componentRef={this.technologiesRef}
              />
              {this.props.values ? (
                <PrimaryButton
                  text="Mentés"
                  type="submit"
                  iconProps={saveIcon}
                  disabled={
                    this.state.missingData.title ||
                    this.state.missingData.description ||
                    this.state.missingData.semester ||
                    this.state.missingData.places ||
                    (this.state.missingData.language1 && this.state.missingData.language2) ||
                    (this.state.missingData.type1 &&
                      this.state.missingData.type2 &&
                      this.state.missingData.type3 &&
                      this.state.missingData.type4 &&
                      this.state.missingData.type5)
                  }
                ></PrimaryButton>
              ) : (
                <PrimaryButton
                  text="Meghirdetés"
                  type="submit"
                  iconProps={publishIcon}
                  allowDisabledFocus
                  disabled={
                    this.state.missingData.title ||
                    this.state.missingData.description ||
                    this.state.missingData.semester ||
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
}

export default TopicForm;
