import * as React from "react";
import {
  ComboBox,
  IComboBoxOption,
  IComboBox,
  SelectableOptionMenuItemType
} from "office-ui-fabric-react/lib/index";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";
import { FormEvent } from "react";

initializeIcons();

let items: IComboBoxOption[] = [
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
items = items.sort((a, b) => (a.key > b.key ? 1 : -1));

let options: IDropdownOption[] = [];

// most egyelőre egy map-ben tárolom az adatokat ////////////////////////////////////////////////////////////////
let teachersToDepartments = new Map<String, String[]>();
teachersToDepartments.set("Algoritmusok és alkalmazásaik", [
  "Pusztai Kinga",
  "Ásványi Tibor",
  "Nagy Sára",
  "Veszprémi Anna",
  "Dr. Csuhaj Varjú Erzsébet",
  "Vadász Péter"
]);
teachersToDepartments.set("Numerikus analízis", [
  "Chripkó Ágnes",
  "Csörgõ István",
  "Filipp Zoltán",
  "Dr. Gergó Lajos",
  "Dr. Szarvas Kristóf"
]);
teachersToDepartments.set("Információs rendszerek", [
  "Dr. Kiss Attila",
  "Dr. Hajas Csilla",
  "Dr. Laki Sándor",
  "Dr. Nikovits Tibor",
  "Dr. Vincellér Zoltán",
  "Brányi László",
  "Dr. Vörös Péter"
]);
teachersToDepartments.set("Komputeralgebra", ["Burcsi Péter", "Dr. Járai Antal", "Tóth Viktória"]);
teachersToDepartments.set("Programozáselmélet és szoftvertechnológia", [
  "Dr. Gregorics Tibor",
  "Borsi Zsolt",
  "Cserép Máté",
  "Dr. Szendrei Rudolf",
  "Dr. Várkonyi Teréz Anna"
]);
teachersToDepartments.set("Programozási nyelvek és fordítóprogramok", [
  "Dr. Horváth Zoltán",
  "Kitlei Róbert",
  "Dr. Kozsik Tamás",
  "Dr. Pataki Norbert",
  "Dr. Porkoláb Zoltán",
  "Dr. Tejfel Máté"
]);
teachersToDepartments.set("Média és oktatásinformatika", [
  "Dr. Abonyi-Tóth Andor",
  "Dr. Zsakó László",
  "Dr. Bernát Péter",
  "Dr. Horváth Győző",
  "Visnovitz Márton"
]);

// STYLES
const comboBoxStyle = { maxWidth: 300 };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

// PROP
type Prop = {
  selectedDepartment: string;
  onChangeDepartment: Function;
  selectedTeacher: string;
  onChangeTeacher: Function;
};

const DepartmentTeacherDropdown: React.FC<Prop> = (props) => {
  const [selectedKey, setSelectedKey] = React.useState(props.selectedDepartment);
  const [disableTeacherDropdown, setDisableTeacherDropdown] = React.useState(
    props.selectedDepartment === "" ? true : false
  );
  const [selectedItem, setSelectedItem] = React.useState(props.selectedTeacher);

  const onChangeTeacher = (
    event: FormEvent<HTMLDivElement>,
    option: IDropdownOption | undefined
  ): void => {
    setSelectedItem(option?.key.toString() || "");
    props.onChangeTeacher(option?.key.toString());
  };

  const onChange = (e: React.FormEvent<HTMLDivElement>, o: IDropdownOption | undefined) => {
    setDisableTeacherDropdown(false);
    let optionsToDepartment: IDropdownOption[] = [];
    if (o) {
      teachersToDepartments
        .get(o.key.toString())
        ?.map((s) => optionsToDepartment.push({ key: s.toString(), text: s.toString() }));
    }
    options = optionsToDepartment;
    options = options.sort((a, b) => (a.key > b.key ? 1 : -1));
    if (o) {
      setSelectedKey(o.key.toString());
      props.onChangeDepartment(o.key.toString());
    }
  };

  return (
    <>
      <Dropdown
        styles={dropdownStyles}
        selectedKey={selectedKey}
        label="Tanszék"
        options={items}
        onChange={onChange}
      />
      <Dropdown
        label="Tanár"
        options={options}
        styles={dropdownStyles}
        disabled={disableTeacherDropdown}
        selectedKey={selectedItem}
        onChange={onChangeTeacher}
        required
      />
      {!disableTeacherDropdown && !selectedItem && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#A4262C",
            marginTop: "7px",
            display: "inline-block"
          }}
        >
          Kötelező tanárt választani a tanszékhez!
        </span>
      )}
    </>
  );
};

export default DepartmentTeacherDropdown;
