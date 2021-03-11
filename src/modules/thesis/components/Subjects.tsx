import * as React from "react";
import { IStackTokens, Stack } from "office-ui-fabric-react/lib/Stack";
import { ComboBox } from "office-ui-fabric-react/lib/index";
import { IComboBox, IComboBoxStyles, IComboBoxOption } from "@fluentui/react";

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

const comboboxStyles: Partial<IComboBoxStyles> = {
  root: { width: 300 },
  optionsContainerWrapper: {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "300px",
    width: 300
  }
};

let options: IComboBoxOption[] = [];
subjects.forEach((name) => options.push({ key: name, text: name }));

options = options.sort((a, b) => (a.text > b.text ? 1 : -1));

const stackTokens: IStackTokens = { childrenGap: 20 };

type Prop = {
  subjects: string[];
  onChange: Function;
};

const Subjects: React.FunctionComponent<Prop> = (props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(props.subjects);

  const onChange = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption | undefined,
    index?: number | undefined,
    value?: string | undefined
  ) => {
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
      <ComboBox
        label="Témához kapcsolódó tantárgyak"
        placeholder="Válassz tantárgyakat..."
        multiSelect
        allowFreeform
        autoComplete="on"
        options={options}
        styles={comboboxStyles}
        selectedKey={selectedKeys}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Subjects;
