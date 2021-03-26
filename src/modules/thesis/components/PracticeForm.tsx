import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { PrimaryButton, IIconProps, DefaultButton, IComboBoxOption } from "office-ui-fabric-react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Language } from "../model/topics.model";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { ComboBox } from "office-ui-fabric-react/lib/index";
import { IComboBoxStyles } from "@fluentui/react";
import { rootPath } from "../path";
import { Practice } from "../model/practice.model";
import { exampleTechnologies } from "../exampleData";

// BEÉGETETT ADATOK JELENLEG ///////////////////////////////////////////////////////////////////////////////////////////
const technologies: string[] = exampleTechnologies.map((t) => t.name);

// STÍLUSOK
const stackTokens = { childrenGap: 5 };
const stackStyles: Partial<IStackStyles> = { root: { width: "100%" } };
const stackStyles2: Partial<IStackStyles> = {
  root: { width: "70%", margin: "auto", marginTop: "10px" }
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
let technologyOptions: IComboBoxOption[] = [];
technologies.forEach((name) => technologyOptions.push({ key: name, text: name }));

technologyOptions = technologyOptions.sort((a, b) => (a.text > b.text ? 1 : -1));

type MissingData = {
  company: boolean;
  contact: boolean;
  description: boolean;
  place: boolean;
  language1: boolean;
  language2: boolean;
};

// without id
type PracticeData = {
  company: string;
  contact: string;
  description: string;
  place: string;
  language: Language[];
  connectedTechnologyIds: string[];
};

type State = {
  missingData: MissingData;
  values: PracticeData;
};

const publishIcon: IIconProps = { iconName: "PublishContent" };
const saveIcon: IIconProps = { iconName: "Save" };

interface IMyProps {}
interface IReactRouterParams {
  id?: string;
}

class PracticeForm extends React.Component<
  IMyProps & RouteComponentProps<IReactRouterParams>,
  State
> {
  private isPracticeGiven: boolean = false;

  constructor(props: any) {
    super(props);

    if (this.props.match.params.id) {
      console.log("van id");
      this.isPracticeGiven = true;
    } else {
      console.log("nincs id");
    }

    // mintatéma melyet betöltök módosításkor
    let examplePractice: Practice = {
      id: "a",
      company: "MINTA CÉG",
      contact: "MINTA KONTAKT",
      description: "MINTA LEÍRÁS",
      connectedTechnologyIds: ["JAVA", "React"],
      language: [Language.English],
      place: "MINTA HELYSZÍN"
    };

    if (this.isPracticeGiven) {
      // most beállítok egy random témát, de majd DB-ből jön URL id alapján
      this.state = {
        values: {
          company: examplePractice.company,
          description: examplePractice.description,
          language: examplePractice.language,
          connectedTechnologyIds: examplePractice.connectedTechnologyIds,
          place: examplePractice.place,
          contact: examplePractice.contact
        },
        missingData: {
          contact: false,
          company: false,
          description: false,
          place: false,
          language1: !examplePractice.language.includes(Language.English),
          language2: !examplePractice.language.includes(Language.Hungarian)
        }
      };
    } else {
      this.state = {
        missingData: {
          company: true,
          description: true,
          contact: true,
          place: true,
          language1: true,
          language2: false
        },
        values: {
          company: "",
          description: "",
          contact: "",
          place: "",
          language: [Language.Hungarian],
          connectedTechnologyIds: []
        }
      };
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getErrorCompany = this.getErrorCompany.bind(this);
    this.getErrorDescription = this.getErrorDescription.bind(this);
    this.getErrorContact = this.getErrorContact.bind(this);
    this.getErrorPlace = this.getErrorPlace.bind(this);
    this.changeLanguage1 = this.changeLanguage1.bind(this);
    this.changeLanguage2 = this.changeLanguage2.bind(this);
  }

  private getErrorCompany = (value: string): string => {
    if (value.trim().length >= 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          company: false
        }
      }));
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          company: true
        }
      }));
      return `Cég nevének megadása kötelező!`;
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

  private getErrorContact = (value: string): string => {
    if (value.trim().length >= 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          contact: false
        }
      }));
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          contact: true
        }
      }));
      return `Cég elérhetőségének megadása kötelező! Az elérhetőségek felsorolása vesszővel elválasztva történjen!`;
    }
  };

  private getErrorPlace = (value: string): string => {
    if (value.trim().length >= 1) {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          place: false
        }
      }));
      return "";
    } else {
      this.setState((state) => ({
        ...this.state,
        missingData: {
          ...state.missingData,
          place: true
        }
      }));
      return `Munkavégzés helyének megadása kötelező!`;
    }
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
        language: this.state.values.language.includes(Language.English)
          ? this.state.values.language.filter((type) => type !== Language.English)
          : [...this.state.values.language, Language.English]
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
        language: this.state.values.language.includes(Language.Hungarian)
          ? this.state.values.language.filter((type) => type !== Language.Hungarian)
          : [...this.state.values.language, Language.Hungarian]
      }
    }));
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Stack styles={stackStyles2}>
          <h2>Szakmai gyakorlati hely {this.isPracticeGiven ? <>módosítása</> : <>kiírása</>}</h2>
          <form onSubmit={this.handleSubmit}>
            <Stack tokens={stackTokens} styles={stackStyles}>
              <TextField
                label="Cég neve"
                name="Cég neve"
                required
                onGetErrorMessage={this.getErrorCompany}
                validateOnLoad={false}
                value={this.state.values.company}
                onChange={(ev, nTitle) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, company: nTitle ? nTitle : "" }
                  })
                }
              />
              <TextField
                label="Cég elérhetőségei"
                name="Cég elérhetőségei"
                placeholder="Az elérhetőségek felsorolása (e-mail, telefonszám, weboldal) vesszővel elválasztva történjen!"
                required
                onGetErrorMessage={this.getErrorContact}
                validateOnLoad={false}
                value={this.state.values.contact}
                onChange={(ev, nTitle) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, contact: nTitle ? nTitle : "" }
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
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <Text style={{ fontWeight: 500 }}>
                      Munkavégzés nyelve<span style={{ color: "rgb(164, 38, 44)" }}> *</span>
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
                        checked={this.state.values.language.includes(Language.English)}
                      />
                      <Checkbox
                        name="hungarian"
                        label="magyar"
                        title="magyar"
                        defaultChecked
                        onChange={this.changeLanguage2}
                        checked={this.state.values.language.includes(Language.Hungarian)}
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
                        Munkavégzés nyelvének megadása kötelező!
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <TextField
                label="Munkavégzés helye"
                required
                name="Munkavégzés helye"
                onGetErrorMessage={this.getErrorPlace}
                validateOnLoad={false}
                value={this.state.values.place}
                onChange={(ev, nValue) =>
                  this.setState({
                    ...this.state,
                    values: { ...this.state.values, place: nValue || "" }
                  })
                }
              />
              <ComboBox
                label="Munka során használt technológiák"
                placeholder="Válassza ki a kapcsolódó technológiákat..."
                multiSelect
                allowFreeform
                autoComplete="on"
                options={technologyOptions}
                styles={comboboxStyles2}
                selectedKey={this.state.values.connectedTechnologyIds}
                onChange={(ev, option) => {
                  this.setState({
                    ...this.state,
                    values: {
                      ...this.state.values,
                      connectedTechnologyIds: option?.selected
                        ? [...this.state.values.connectedTechnologyIds, option.key.toString()]
                        : this.state.values.connectedTechnologyIds.filter((k) => k !== option?.key)
                    }
                  });
                }}
              />
              {this.isPracticeGiven ? (
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <PrimaryButton
                      text="Mentés"
                      type="submit"
                      iconProps={saveIcon}
                      disabled={
                        this.state.missingData.company ||
                        this.state.missingData.description ||
                        this.state.missingData.place ||
                        this.state.missingData.contact ||
                        (this.state.missingData.language1 && this.state.missingData.language2)
                      }
                      style={{ position: "relative", left: "50%" }}
                    ></PrimaryButton>
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Link to={rootPath + "/practices"}>
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
                    this.state.missingData.company ||
                    this.state.missingData.description ||
                    this.state.missingData.place ||
                    this.state.missingData.contact ||
                    (this.state.missingData.language1 && this.state.missingData.language2)
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

    // új szakmai gyakorlati hely összeállítása
    let newPractice: Practice = {
      id: "valami", // TODO
      contact: this.state.values.contact,
      company: this.state.values.company,
      description: this.state.values.description,
      connectedTechnologyIds: this.state.values.connectedTechnologyIds,
      place: this.state.values.place,
      language: this.state.values.language
    };
    console.log(newPractice);
  }
}

export default withRouter(PracticeForm);
