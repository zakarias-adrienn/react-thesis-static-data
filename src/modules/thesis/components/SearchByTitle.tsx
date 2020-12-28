import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };


/* eslint-disable react/jsx-no-bind */
const SearchByTitle = () => {
  return (
    <Stack tokens={stackTokens}>
      <SearchBox
      placeholder="Szűrés témacím alapján..." onSearch={newValue => console.log('value is ' + newValue)} />
    </Stack>
  );
};

export default SearchByTitle;