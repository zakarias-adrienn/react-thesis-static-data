import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

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

const stackTokens: IStackTokens = { childrenGap: 20 };

const Subjects: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens} id="subjects">
      <Dropdown
        placeholder="Válassz tantárgyakat..."
        label="Válaszd ki a számodra megfelelő tantárgyakat!"
        multiSelect
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
};

export default Subjects;
