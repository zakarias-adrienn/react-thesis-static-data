import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { ComboBox } from "office-ui-fabric-react/lib/index";
import { IComboBox, IComboBoxStyles, IComboBoxOption } from "@fluentui/react";

const comboboxStyles: Partial<IComboBoxStyles> = {
  root: { width: 300 },
  optionsContainerWrapper: {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "300px",
    width: 300
  }
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

let technologyOptions: IComboBoxOption[] = [];
technologies.forEach((name) => technologyOptions.push({ key: name, text: name }));
technologyOptions = technologyOptions.sort((t1, t2) => (t1.key < t2.key ? -1 : 1));

const stackTokens: IStackTokens = { childrenGap: 20 };

type Prop = {
  technologies: string[];
  onChange: Function;
};

const Technologies: React.FunctionComponent<Prop> = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(props.technologies);

  const onChange = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption | undefined,
    index?: number | undefined,
    value?: string | undefined
  ) => {
    if (selectedKeys.includes(option?.key.toString() || "")) {
      let keys = selectedKeys.filter((key) => key !== option?.key.toString() || "");
      setSelectedKeys(keys);
    } else {
      setSelectedKeys([...selectedKeys, option?.key.toString() || ""]);
    }
    props.onChange(option?.key.toString() || "");
  };

  return (
    <Stack tokens={stackTokens}>
      <ComboBox
        label="Témához kapcsolódó technológiák"
        placeholder="Válassz(on) technológiákat..."
        multiSelect
        allowFreeform
        autoComplete="on"
        options={technologyOptions}
        styles={comboboxStyles}
        selectedKey={selectedKeys}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Technologies;
