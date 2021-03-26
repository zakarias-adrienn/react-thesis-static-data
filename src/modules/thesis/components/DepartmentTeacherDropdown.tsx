import * as React from "react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Dropdown, IDropdownStyles, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { FormEvent } from "react";
import { exampleDepartments, exampleTeachers, exampleUsers } from "../exampleData";

initializeIcons();

let items: IDropdownOption[] = [];
exampleDepartments.forEach((dep) => items.push({ key: dep.id, text: dep.name }));
items = items.sort((a, b) => (a.text > b.text ? 1 : -1));

let options: IDropdownOption[] = [];

// most egyelőre egy map-ben tárolom az adatokat ////////////////////////////////////////////////////////////////
let teachersToDepartments = new Map<String, String[]>();
// meg kell kapni az ugyanolyan tanszékű tanárok tömbjét
exampleDepartments.forEach((dep) => {
  let teachersHere = exampleTeachers.filter((t) => t.departmentId === dep.id);
  // ezek egyelőre tanárok, de kellenek a neveik, ami a user táblában lesz
  // 1-1 kapcsolat
  let teacherNames = teachersHere.map((t) => exampleUsers.filter((u) => u.id === t.userId)[0].name);
  teacherNames = teacherNames.sort(function (a, b) {
    return a.localeCompare(b);
  });
  teachersToDepartments.set(dep.id, teacherNames);
});

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
    options = options.sort((a, b) => a.text.localeCompare(b.text));
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
    </>
  );
};

export default DepartmentTeacherDropdown;
