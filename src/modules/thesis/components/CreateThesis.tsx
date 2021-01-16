import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

const stackTokens = { childrenGap: 10 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

let options: IDropdownOption[] = [
  { key: 'Webprogramozás', text: 'Webprogramozás' },
  { key: 'Mesterséges intelligencia', text: 'Mesterséges intelligencia' },
  { key: 'Telekommunikációs hálózatok', text: 'Telekommunikációs hálózatok' },
  { key: 'Konkurens programozás', text: 'Konkurens programozás' },
  { key: 'Algoritmusok és adatszerkezetek 1', text: 'Algoritmusok és adatszerkezetek 1' },
];

options = options.sort((a, b) => (a.key > b.key) ? 1 : -1);

let options2: IDropdownOption[] = [
  { key: 'JAVA', text: 'JAVA' },
  { key: 'C++', text: 'C++' },
  { key: 'HTML5', text: 'HTML5' },
  { key: 'CSS', text: 'CSS' },
  { key: 'Javascript', text: 'Javascript' },
  { key: 'React', text: 'React' },
];

options2 = options2.sort((a, b) => (a.key > b.key) ? 1 : -1);

const semesters: IChoiceGroupOption[] = [
  { key: 'autumn', text: 'Ősz' },
  { key: 'spring', text: 'Tavasz' }
];

const CreateThesis: React.FunctionComponent = () => {
  return (
    <div>
      <h2>Téma kiírása</h2>
      <Stack tokens={stackTokens} styles={stackStyles}>
          <TextField label="Cím" />
          <TextField label="Leírás" multiline rows={3} />
          <MaskedTextField label="Félév" mask="2099/99" />
          <ChoiceGroup defaultSelectedKey="autumn" options={semesters} required={true} />
          <p>Téma jellege</p>
          <Checkbox label="Szakdolgozati" onChange={_onChange} />
          <Checkbox label="TDK" onChange={_onChange} />
          <TextField label="Helyek száma" type='number' min='1' />
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
          <PrimaryButton text="Meghirdetés" onClick={_alertClicked} allowDisabledFocus />
      </Stack>
    </div>
  );
};

function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}

function _alertClicked(): void {
  alert('Clicked');
}

export default CreateThesis;