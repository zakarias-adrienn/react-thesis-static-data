import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300, marginBottom: "10px" }
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
