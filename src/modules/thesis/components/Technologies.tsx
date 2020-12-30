import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import TechnologiesStories from './Technologies.stories';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const options: IDropdownOption[] = [
  { key: 'JAVA', text: 'JAVA' },
  { key: 'C++', text: 'C++' },
  { key: 'HTML5', text: 'HTML5' },
  { key: 'CSS', text: 'CSS' },
  { key: 'Javascript', text: 'Javascript' },
  { key: 'React', text: 'React' },
];

const stackTokens: IStackTokens = { childrenGap: 20 };

const Technologies: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Dropdown
        placeholder="Válassz technológiákat..."
        label="Válaszd ki a számodra megfelelő technológiákat!"
        multiSelect
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
};

export default Technologies;