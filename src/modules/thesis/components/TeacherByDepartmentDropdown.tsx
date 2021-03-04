import * as React from "react";
import {
  ComboBox,
  IComboBoxOption,
  IComboBox,
  SelectableOptionMenuItemType
} from "office-ui-fabric-react/lib/index";

const items: IComboBoxOption[] = [
  { key: "Algoritmusok és alkalmazásaik", text: "Algoritmusok és alkalmazásaik" },
  { key: "Információs rendszerek", text: "Információs rendszerek" },
  { key: "Komputeralgebra", text: "Komputeralgebra" },
  { key: "Numerikus analízis", text: "Numerikus analízis" },
  {
    key: "Programozáselmélet és szoftvertechnológia",
    text: "Programozáselmélet és szoftvertechnológia"
  },
  {
    key: "Programozási nyelvek és fordítóprogramok",
    text: "Programozási nyelvek és fordítóprogramok"
  },
  { key: "Média és oktatásinformatika", text: "Média és oktatásinformatika" }
];

const comboBoxStyle = { maxWidth: 300 };

interface Prop {
  disabled: boolean;
}

const TeacherByDepartmentDropdown: React.FC<Prop> = (props) => {
  console.log(props.disabled);

  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>();

  const onChange = React.useCallback(
    (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
      setSelectedKey(option?.key);
    },
    [setSelectedKey]
  );

  return (
    <ComboBox
      style={comboBoxStyle}
      selectedKey={selectedKey}
      label="Tanár"
      allowFreeform
      autoComplete="on"
      options={items}
      onChange={onChange}
      disabled={props.disabled}
    />
  );
};

export default TeacherByDepartmentDropdown;
