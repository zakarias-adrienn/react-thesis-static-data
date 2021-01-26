import React from "react";
import {
    ComboBox,
    IComboBox,
    IComboBoxOption,
    PrimaryButton,
    SelectableOptionMenuItemType,
  } from 'office-ui-fabric-react/lib/index';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

// abc szerinti rendezés itt?
const comboBoxBasicOptions: IComboBoxOption[] = [
    { key: 'ADATTUDOMÁNYI ÉS ADATTECHNOLÓGIAI TANSZÉK', text: 'ADATTUDOMÁNYI ÉS ADATTECHNOLÓGIAI TANSZÉK', itemType: SelectableOptionMenuItemType.Header },
    { key: 'Dr. Horváth Tamás', text: 'Dr. Horváth Tamás' },
    { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'ALGORITMUSOK ÉS ALKALMAZÁSAIK TANSZÉK', text: 'ALGORITMUSOK ÉS ALKALMAZÁSAIK TANSZÉK', itemType: SelectableOptionMenuItemType.Header },
    { key: 'Dr. Csuhaj Varjú Erzsébet', text: 'Dr. Csuhaj Varjú Erzsébet' },
    { key: 'Vadász Péter', text: 'Vadász Péter' }
];




const comboBoxMultiStyle = { maxWidth: 300, display: 'block', marginTop: '10px' };
const comboBoxMultiStyle2 = { maxWidth: 300, display: 'block', marginTop: '10px' };

const SearchTeacher: React.FC = () => {
  const comboBoxRef = React.useRef<IComboBox>(null);
  const onOpenClick = React.useCallback(() => comboBoxRef.current?.focus(true), []);

  return (
    <div>
      <ComboBox
        componentRef={comboBoxRef}
        label="Tanár választása"
        allowFreeform
        autoComplete="on"
        options={comboBoxBasicOptions}
        style={comboBoxMultiStyle2}
      />
      {/* <PrimaryButton text="Lehetőségek megnyitása" style={comboBoxMultiStyle} onClick={onOpenClick} /> */}
    </div>
  );
};

export default SearchTeacher;