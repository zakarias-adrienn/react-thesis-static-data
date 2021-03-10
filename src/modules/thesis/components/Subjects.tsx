import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

// BEÉGETETT TANTÁRGYAK
const subjects = [
  "Mesterséges intelligencia",
  "Webprogramozás",
  "Webfejlesztés",
  "Telekommunikációs hálózatok",
  "Konkurens programozás",
  "Algoritmusok és adatszerkezetek 1",
  "Algoritmusok és adatszerkezetek 2",
  "Programozás",
  "Numerikus módszerek",
  "A számításelmélet alapjai 1",
  "A számításelmélet alapjai 2",
  "Valószínűségszámítás és statisztika",
  "Diszkrét modellek alkalmazásai",
  "Szoftvertechnológia"
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300, marginBottom: "10px" },
  dropdownItemsWrapper: { overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }
};

let options: IDropdownOption[] = [];
subjects.forEach((name) => options.push({ key: name, text: name }));

options = options.sort((a, b) => (a.text > b.text ? 1 : -1));

const stackTokens: IStackTokens = { childrenGap: 20 };

type Prop = {
  subjects: string[];
  onChange: Function;
};

const Subjects: React.FunctionComponent<Prop> = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(props.subjects);

  const onChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption | undefined) => {
    if (selectedKeys.includes(option?.key.toString() || "")) {
      let keys = selectedKeys.filter((key) => key != option?.key.toString() || "");
      setSelectedKeys(keys);
    } else {
      setSelectedKeys([...selectedKeys, option?.key.toString() || ""]);
    }
    props.onChange(option?.key.toString() || "");
  };

  return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Válassz tantárgyakat..."
        label="Témához kapcsolódó tantárgyak"
        multiSelect
        options={options}
        styles={dropdownStyles}
        selectedKeys={selectedKeys}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Subjects;
