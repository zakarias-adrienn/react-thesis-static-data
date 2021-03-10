import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  dropdownItemsWrapper: { overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }
};

// beégetett adat, majd map(item => item.name)
const technologies = [
  "JAVA",
  "C++",
  "HTML5",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Oracle",
  "MySQL",
  "SQLite"
];

let technologyOptions: IDropdownOption[] = [];
technologies.forEach((name) => technologyOptions.push({ key: name, text: name }));

const stackTokens: IStackTokens = { childrenGap: 20 };

type Prop = {
  technologies: string[];
  onChange: Function;
};

const Technologies: React.FunctionComponent<Prop> = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(props.technologies);

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
        placeholder="Válassz technológiákat..."
        label="Témához kapcsolódó technológiák"
        multiSelect
        options={technologyOptions}
        styles={dropdownStyles}
        selectedKeys={selectedKeys}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Technologies;
