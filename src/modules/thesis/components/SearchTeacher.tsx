import React from "react";
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType
} from "office-ui-fabric-react/lib/index";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

// abc szerinti rendezés itt?
const comboBoxBasicOptions: IComboBoxOption[] = [
  {
    key: "ADATTUDOMÁNYI ÉS ADATTECHNOLÓGIAI TANSZÉK",
    text: "ADATTUDOMÁNYI ÉS ADATTECHNOLÓGIAI TANSZÉK",
    itemType: SelectableOptionMenuItemType.Header
  },
  { key: "Dr. Horváth Tamás", text: "Dr. Horváth Tamás" },
  { key: "divider", text: "-", itemType: SelectableOptionMenuItemType.Divider },
  {
    key: "ALGORITMUSOK ÉS ALKALMAZÁSAIK TANSZÉK",
    text: "ALGORITMUSOK ÉS ALKALMAZÁSAIK TANSZÉK",
    itemType: SelectableOptionMenuItemType.Header
  },
  { key: "Dr. Csuhaj Varjú Erzsébet", text: "Dr. Csuhaj Varjú Erzsébet" },
  { key: "Vadász Péter", text: "Vadász Péter" }
];

const comboBoxMultiStyle = {
  maxWidth: 300,
  display: "block",
  marginTop: "10px",
  marginBottom: "10px"
};

interface TeacherProps {
  onChange?: any;
}

const SearchTeacher: React.FC<TeacherProps> = (props) => {
  const comboBoxRef = React.useRef<IComboBox>(null);
  //const onOpenClick = React.useCallback(() => comboBoxRef.current?.focus(true), []);

  return (
    <div>
      <ComboBox
        componentRef={comboBoxRef}
        label="Témavezető tanár"
        allowFreeform
        autoComplete="on"
        options={comboBoxBasicOptions}
        style={comboBoxMultiStyle}
        id="teacherSearch"
        onItemClick={(e, selectedItem) => props.onChange(selectedItem)}
        // onChange={(e, selectedItem) => console.log(selectedItem)}
      />
      {/* <PrimaryButton text="Lehetőségek megnyitása" style={comboBoxMultiStyle} onClick={onOpenClick} /> */}
    </div>
  );
};

export default SearchTeacher;
