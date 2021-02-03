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
  tokens: { childrenGap: 5 },
  styles: { root: { width: 800, alignItems: "center" as "center" } }
};

const EditThesis: React.FunctionComponent = () => {
  return (
    <div>
      <Stack {...columnProps}>
        <h2>Téma szerkesztése</h2>
        <Stack tokens={stackTokens} styles={stackStyles}>
          <TextField label="Cím" value="Youniversity" />
          <TextField
            label="Leírás"
            multiline
            rows={3}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Cras tincidunt lobortis feugiat vivamus at augue eget arcu. A arcu cursus vitae congue. 
          Mauris pharetra et ultrices neque ornare aenean euismod elementum. Duis convallis convallis tellus 
          id interdum velit laoreet id donec. Mauris pharetra et ultrices neque ornare aenean euismod. 
          Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Erat pellentesque adipiscing 
          commodo elit at imperdiet dui accumsan sit. Montes nascetur ridiculus mus mauris vitae ultricies.
           Netus et malesuada fames ac. Interdum varius sit amet mattis. Mi in nulla posuere sollicitudin. 
           Risus quis varius quam quisque id diam vel quam elementum. Quis blandit turpis cursus in. 
           Pharetra sit amet aliquam id diam. Sed augue lacus viverra vitae congue eu consequat. 
           Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Quisque egestas 
           diam in arcu cursus euismod quis viverra. Et sollicitudin ac orci phasellus."
          />
          <MaskedTextField label="Félév" mask="9999/99" value="2020/21" />
          <ChoiceGroup defaultSelectedKey="autumn" options={semesters} required={true} />
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6">
                Téma jellege
                <Checkbox
                  label="Szakdolgozati"
                  title="Szakdolgozati"
                  /*onChange={_onChange}*/
                  checked
                />
                <Checkbox label="TDK" title="TDK" /*onChange={_onChange}*/ />
              </div>
              <div className="ms-Grid-col ms-sm6">
                Témaírás nyelve
                <Checkbox label="angol" title="angol" /*onChange={_onChange}*/ />
                <Checkbox label="magyar" title="magyar" /*onChange={_onChange}*/ checked />
              </div>
            </div>
          </div>
          <TextField label="Helyek száma" type="number" min="1" value="4" />
          <Dropdown
            placeholder="Válassza ki a kapcsolódó tantárgyakat..."
            label="Tantárgyak"
            multiSelect
            options={options}
            defaultSelectedKeys={["Webprogramozás"]}
            //styles={dropdownStyles}
          />
          <Dropdown
            placeholder="Válassza ki a kapcsolódó technológiákat..."
            label="Technológiák"
            multiSelect
            options={options2}
            defaultSelectedKeys={["React", "JAVA"]}
            //styles={dropdownStyles}
          />
          <PrimaryButton text="Mentés" onClick={_alertClicked} allowDisabledFocus />
          <br />
        </Stack>
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

export default EditThesis;
