import * as React from 'react';

import {
  TagPicker,
  IBasePicker,
  ITag,
  IInputProps,
  IBasePickerSuggestionsProps,
} from 'office-ui-fabric-react/lib/Pickers';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});


const inputProps: IInputProps = {
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
  'aria-label': 'Tag picker',
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Ajánlott tanárok',
  noResultsFoundText: 'Nincs találat',
};

let testTags: ITag[] = [
  'Visnovitz Márton',
  'Dr. Horváth Tamás',
  'Dr. Csuhaj Varjú Erzsébet'
].map(item => ({ key: item, name: item }));

testTags = testTags.sort((a, b) => (a.key > b.key) ? 1 : -1);

// érdekes algoritmus
const withoutDrTags: ITag[] = testTags.map(function(item){
    if(item.name.toLowerCase().indexOf('dr.')===0){
        return {key: item.name.slice(4), name: item.name.slice(4), isDr: true};
    } else {
        return {key: item.name, name: item.name, isDr: false};
    }
    }
);
console.log(withoutDrTags);


const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some(compareTag => compareTag.key === tag.key);
};

const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  return filterText
    ? testTags.filter(
        tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList),
      )
    : [];
};

// érdekes folytatása
const filterSelectedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  if(filterText) { 
    const t = withoutDrTags.map(
        function(tag){
            if(tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0){
                if(tag.isDr===true){
                    const t = testTags.filter(item => item.name.slice(4)===tag.name)[0];
                    return t;
                }
                return tag;
            }
            return null;
    }).filter(item => item!=null);
    if(t.length===0){
        const tt = testTags.filter(
            tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0);
        return tt;
    } else {
        return t;
    }
 } else {
     return [];
 }
};


const returnMostRecentlyUsed = (currentPersonas: ITag[]): ITag[] | Promise<ITag[]> => {
    return testTags;
  };

const getTextFromItem = (item: ITag) => item.name;

const Teachers2: React.FunctionComponent = () => {
  // All pickers extend from BasePicker specifying the item type.
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);

  const onItemSelected = React.useCallback((item: ITag): ITag | null => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  }, []);

  return (
    <div className={rootClass}>
      Tanárválasztó <br/>
      Kétszer nem engedi ugyanannak a tanárnak a kiválasztását.
      Maximum 5 különböző tanár választható jelenleg.
      <TagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onEmptyInputFocus={returnMostRecentlyUsed}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={5}
        disabled={tagPicker}
        inputProps={inputProps}
        
      />
    </div>
  );
};

export default Teachers2;