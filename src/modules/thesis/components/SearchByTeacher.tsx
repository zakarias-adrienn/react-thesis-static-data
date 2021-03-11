import React from "react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Stack } from "office-ui-fabric-react/lib/Stack";

// saját importok
import DepartmentTeacherDropdown from "./DepartmentTeacherDropdown";
import TeacherByName from "./TeacherByName";

const horizontalChoiceGroupStyles = {
  flexContainer: { display: "flex", flexDirection: "row" },
  marginTop: "0px",
  paddingTop: "0px"
};

const teacherOptions: IChoiceGroupOption[] = [
  {
    key: "department",
    text: "Tanszék alapján",
    styles: { root: { marginRight: "10px", marginTop: "0px" } }
  },
  { key: "name", text: "Név alapján", styles: { root: { marginTop: "0px" } } }
];

type Prop = {
  selectedDepartment: string;
  onChangeDepartment: Function;
  byDepartment: boolean;
  setByDepartment: Function;
  selectedTeacher: string;
  onChangeTeacher: Function;
  selectedTeacher2: string[];
  onChangeTeacher2: Function;
};

const SearchByTeacher: React.FC<Prop> = (props) => {
  const [byDepartment, setByDepartment] = React.useState(props.byDepartment);

  const changeTeacherOption = () => {
    setByDepartment(!byDepartment);
    props.setByDepartment();
  };

  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row" style={{ marginTop: "15px" }}>
        <div className="ms-Grid-col ms-sm12">
          <Text style={{ fontWeight: 500, marginTop: "10px" }}>Témavezető választása</Text>
          <Stack style={{ marginBottom: "10px", marginTop: "5px" }}>
            <ChoiceGroup
              styles={horizontalChoiceGroupStyles}
              name="departmentorname"
              selectedKey={byDepartment ? "department" : "name"}
              options={teacherOptions}
              required={true}
              onChange={changeTeacherOption}
            />
          </Stack>
        </div>
      </div>
      {byDepartment ? (
        <>
          <DepartmentTeacherDropdown
            selectedDepartment={props.selectedDepartment}
            onChangeDepartment={props.onChangeDepartment}
            selectedTeacher={props.selectedTeacher}
            onChangeTeacher={props.onChangeTeacher}
          ></DepartmentTeacherDropdown>
        </>
      ) : (
        <TeacherByName
          selectedTeacher={props.selectedTeacher2}
          setSelectedTeacher={props.onChangeTeacher2}
        ></TeacherByName>
      )}
    </div>
  );
};

export default SearchByTeacher;
