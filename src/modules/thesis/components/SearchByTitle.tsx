import * as React from "react";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Stack, IStackTokens } from "office-ui-fabric-react/lib/Stack";

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

const getStyles = () => {
  return {
    root: {
      maxWidth: "300px",
      marginBottom: "10px",
      marginTop: "10px"
    }
  };
};

const SearchByTitle = () => {
  return (
    <Stack tokens={stackTokens}>
      <SearchBox
        styles={getStyles}
        placeholder="Keresés témacím alapján..."
        onSearch={(newValue) => console.log("value is " + newValue)}
        id="titleSearch"
      />
    </Stack>
  );
};

export default SearchByTitle;
