import * as React from "react";

import {
  TagPicker,
  IBasePicker,
  ITag,
  IInputProps,
  IBasePickerSuggestionsProps
} from "office-ui-fabric-react/lib/Pickers";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { useBoolean } from "@uifabric/react-hooks";

const rootClass = mergeStyles({
  maxWidth: 500
});

const inputProps: IInputProps = {
  "onBlur": (ev: React.FocusEvent<HTMLInputElement>) => console.log("onBlur called"),
  "onFocus": (ev: React.FocusEvent<HTMLInputElement>) => console.log("onFocus called"),
  "aria-label": "Tag picker",
  "placeholder": "Kezdj el gépelni..."
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Ajánlott tanárok",
  noResultsFoundText: "Nincs találat"
};

let testTags: ITag[] = [
  "Pusztai Kinga",
  "Ásványi Tibor",
  "Nagy Sára",
  "Veszprémi Anna",
  "Dr. Csuhaj Varjú Erzsébet",
  "Chripkó Ágnes",
  "Csörgõ István",
  "Filipp Zoltán",
  "Dr. Gergó Lajos",
  "Dr. Szarvas Kristóf",
  "Dr. Kiss Attila",
  "Dr. Hajas Csilla",
  "Dr. Laki Sándor",
  "Dr. Nikovits Tibor",
  "Dr. Vincellér Zoltán",
  "Brányi László",
  "Dr. Vörös Péter",
  "Dr. Gregorics Tibor",
  "Borsi Zsolt",
  "Cserép Máté",
  "Dr. Szendrei Rudolf",
  "Dr. Várkonyi Teréz Anna",
  "Dr. Horváth Zoltán",
  "Kitlei Róbert",
  "Dr. Kozsik Tamás",
  "Dr. Pataki Norbert",
  "Dr. Porkoláb Zoltán",
  "Dr. Tejfel Máté",
  "Dr. Abonyi-Tóth Andor",
  "Dr. Zsakó László",
  "Dr. Bernát Péter",
  "Dr. Horváth Győző"
].map((item) => ({ key: item, name: item }));

testTags = testTags.sort((a, b) => (a.key > b.key ? 1 : -1));

const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some((compareTag) => compareTag.key === tag.key);
};

// érdekes folytatása
const filterSelectedTags = (filterText: string): ITag[] => {
  return filterText
    ? testTags.filter(
        (tag) =>
          tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 ||
          tag.name.toLowerCase().substring(4).indexOf(filterText.toLowerCase()) == 0
      )
    : [];
};

const returnMostRecentlyUsed = (): ITag[] | Promise<ITag[]> => {
  return testTags.slice(0, 5);
};

const getTextFromItem = (item: ITag) => item.name;

type Prop = {
  selectedTeacher: string;
  setSelectedTeacher: Function;
};

const TeacherByName: React.FunctionComponent<Prop> = (props) => {
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);
  const [selectedItem, setSelectedItem] = React.useState<ITag[]>(
    props.selectedTeacher ? [{ key: props.selectedTeacher, name: props.selectedTeacher }] : []
  );

  const onItemSelected = React.useCallback((item): ITag | null => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    props.setSelectedTeacher(item.key);
    return item;
  }, []);

  const changeItem = (item: ITag[] | undefined) => {
    item ? setSelectedItem(item) : setSelectedItem([]);
    props.setSelectedTeacher(item?.[0]?.key || "");
  };

  return (
    <div style={{ width: "50%" }}>
      <TagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onEmptyInputFocus={returnMostRecentlyUsed}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={1}
        disabled={tagPicker}
        inputProps={inputProps}
        selectedItems={selectedItem}
        onChange={changeItem}
      />
    </div>
  );
};

export default TeacherByName;
