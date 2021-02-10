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
  tokens: { childrenGap: 2 },
  styles: {
    // root: { width: 1000, alignItems: "center" as "center", alignSelf: "center" as "center" }
  }
};

const SeeTheme: React.FunctionComponent = () => {
  return (
    <div>
      <Stack {...columnProps}>
        <p>
          <b>Cím:</b>
          Youniversity
        </p>
        <p>
          <b>Leírás: </b>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          <b>Témavezető:</b>
          Visnovitz Márton
        </p>
        <p>
          <b>Félév:</b>
          2020/21-ősz
        </p>
        <p>
          <b>Helyek száma:</b>1
        </p>
        <p>
          <b>Technológiák:</b>
          <ul>
            <li>React</li>
            <li>Typescript</li>
          </ul>
        </p>
        <p>
          <b>Tantárgyak:</b>
          <ul>
            <li>Webprogramozás</li>
            <li>Számításelmélet</li>
          </ul>
        </p>
        {/* ha diák a bejelentkezett felhasználó és nem teltek be a helyek erre a témára */}
        <PrimaryButton text="Jelentkezés" onClick={_alertClicked} allowDisabledFocus />
      </Stack>
    </div>
  );
};

function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

function _alertClicked(): void {
  alert("Clicked");
}

export default SeeTheme;
