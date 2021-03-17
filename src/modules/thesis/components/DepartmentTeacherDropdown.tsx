import * as React from "react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { FormEvent } from "react";

initializeIcons();

let items: IDropdownOption[] = [
  { key: "Algoritmusok és Alkalmazásaik", text: "Algoritmusok és Alkalmazásaik" },
  { key: "Információs Rendszerek", text: "Információs Rendszerek" },
  { key: "Komputeralgebra", text: "Komputeralgebra" },
  { key: "Numerikus Analízis", text: "Numerikus Analízis" },
  {
    key: "Programozáselmélet és Szoftvertechnológiai",
    text: "Programozáselmélet és Szoftvertechnológiai"
  },
  {
    key: "Programozási Nyelvek és Fordítóprogramok",
    text: "Programozási Nyelvek és Fordítóprogramok"
  },
  { key: "Média- és Oktatásinformatika", text: "Média- és Oktatásinformatika" },
  { key: "Valószínűségelméleti és Statisztika", text: "Valószínűségelméleti és Statisztika" },
  {
    key: "Térképtudományi és Geoinformatikai Intézet",
    text: "Térképtudományi és Geoinformatikai Intézet"
  },
  { key: "Adattudományi és Adattechnológiai", text: "Adattudományi és Adattechnológiai" },
  { key: "Mesterséges Intelligencia", text: "Mesterséges Intelligencia" },
  { key: "Savaria Műszaki Intézet", text: "Savaria Műszaki Intézet" }
];
items = items.sort((a, b) => (a.text > b.text ? 1 : -1));

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
teachersToDepartments.set("Valószínűségelméleti és Statisztika", [
  "Arató Miklós",
  "Zempléni András"
]);
teachersToDepartments.set("Térképtudományi és Geoinformatikai Intézet", ["Dr. Zentai László"]);
teachersToDepartments.set("Adattudományi és Adattechnológiai", [
  "Dr. Horváth Tamás",
  "Tarcsi Ádám"
]);
teachersToDepartments.set("Mesterséges Intelligencia", ["Belics Éva"]);
teachersToDepartments.set("Savaria Műszaki Intézet", ["Dr. Bak Árpád", "Dr. Borbély Tibor"]);
// Prof. habil. <- ezek kiszűrése is esetleg?

// STÍLUSOK
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

// PROP TÍPUS
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
    options = options.sort((a, b) => (a.text > b.text ? 1 : -1));
    if (o) {
      setSelectedKey(o.key.toString());
      setSelectedItem("");
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
      />
      {/* {!disableTeacherDropdown && !selectedItem && (
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
      )} */}
    </>
  );
};

export default DepartmentTeacherDropdown;
