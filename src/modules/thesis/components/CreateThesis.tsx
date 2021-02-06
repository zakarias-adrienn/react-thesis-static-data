import * as React from "react";
import { TextField, MaskedTextField } from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Text } from "office-ui-fabric-react/lib/Text";

const stackTokens = { childrenGap: 10 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
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
  { key: "autumn", text: "Ősz" },
  { key: "spring", text: "Tavasz" }
];

const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 5 },
  styles: { root: { width: 800, alignItems: "center" as "center" } }
};

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  console.log("Beküldték");
}

type MissingData = {
  title: boolean;
  description: boolean;
  semester: boolean;
  places: boolean;
};

class CreateThesis extends React.Component<{}, MissingData> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: true,
      description: true,
      semester: true,
      places: true
    };
  }

  getErrorMessage = (value: string): string => {
    if (value.length >= 1) {
      this.setState((state) => ({
        ...state,
        title: false
      }));
      console.log(this.state);
      return "";
    } else {
      return `Cím megadása kötelező!`;
    }
    //return value.length >= 1 ? "" : `Cím megadása kötelező!`;
  };

  getErrorDescription = (value: string): string => {
    if (value.length >= 1) {
      this.setState((state) => ({
        ...state,
        description: false
      }));
      console.log(this.state);
      return "";
    } else {
      return `Leírás megadása kötelező!`;
    }
    // return value.length >= 1 ? "" : `Leírás megadása kötelező!`;
  };

  getErrorSemester = (value: string): string => {
    console.log(value);
    const regex = new RegExp("[0-9][0-9][0-9][0-9]/[0-9][0-9]");
    if (regex.test(value)) {
      this.setState((state) => ({
        ...state,
        semester: false
      }));
      console.log(this.state);
      return "";
    } else {
      return "Félév formátuma nem helyes! Példa helyes formátumra: 2020/21";
    }
    // return regex.test(value) ? "" : "Félév formátuma nem helyes! Példa helyes formátumra: 2020/21";
    // TODO: azt is ellenőrizni kellene, hogy a második 2 számjegy pontosan 1-el legyen nagyobb mint az első 2 beírt
  };

  getErrorNumPlaces = (value: string): string => {
    if (value.length >= 1) {
      this.setState((state) => ({
        ...state,
        places: false
      }));
      console.log(this.state);
      return "";
    } else {
      return `Helyek számának megadása kötelező!`;
    }
    //return value.length >= 1 ? "" : `Helyek számának megadása kötelező!`;
  };

  render() {
    return (
      <div>
        <Stack {...columnProps}>
          <h2>Téma kiírása</h2>
          <form onSubmit={handleSubmit}>
            <Stack tokens={stackTokens} styles={stackStyles}>
              <TextField
                label="Cím"
                required
                onGetErrorMessage={this.getErrorMessage}
                validateOnLoad={false}
              />
              <TextField
                label="Leírás"
                multiline
                rows={3}
                required
                onGetErrorMessage={this.getErrorDescription}
                validateOnLoad={false}
              />
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <MaskedTextField
                      label="Félév"
                      mask="2099/99"
                      required
                      onGetErrorMessage={this.getErrorSemester}
                      validateOnLoad={false}
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <ChoiceGroup defaultSelectedKey="autumn" options={semesters} required={true} />
                  </div>
                </div>
                <br />

                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <Text>Téma jellege</Text>
                    <Checkbox
                      label="Bsc szakdolgozati"
                      title="Bsc szakdolgozati"
                      /*onChange={_onChange}*/
                      checked
                    />
                    <Checkbox label="Bsc TDK" title="Bsc TDK" /*onChange={_onChange}*/ />
                    <Checkbox
                      label="Msc szakdolgozati"
                      title="Msc szakdolgozati"
                      /*onChange={_onChange}*/
                    />
                    <Checkbox label="Msc TDK" title="Msc TDK" /*onChange={_onChange}*/ />
                  </div>
                  <div className="ms-Grid-col ms-sm6">
                    <Text>Témaírás nyelve</Text>
                    <Checkbox label="angol" title="angol" /*onChange={_onChange}*/ />
                    <Checkbox label="magyar" title="magyar" checked /*onChange={_onChange}*/ />
                  </div>
                </div>
              </div>
              <TextField
                label="Helyek száma"
                type="number"
                min="1"
                required
                onGetErrorMessage={this.getErrorNumPlaces}
                validateOnLoad={false}
              />
              <Dropdown
                placeholder="Válassza ki a kapcsolódó tantárgyakat..."
                label="Tantárgyak"
                multiSelect
                options={options}
                //styles={dropdownStyles}
              />
              <Dropdown
                placeholder="Válassza ki a kapcsolódó technológiákat..."
                label="Technológiák"
                multiSelect
                options={options2}
                //styles={dropdownStyles}
              />
              <PrimaryButton
                text="Meghirdetés"
                onClick={_alertClicked}
                allowDisabledFocus
                disabled={
                  this.state.title ||
                  this.state.description ||
                  this.state.semester ||
                  this.state.places
                }
              />
              <br />
            </Stack>
          </form>
        </Stack>
      </div>
    );
  }
}

function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

function _alertClicked(): void {
  alert("Clicked");
}

export default CreateThesis;
