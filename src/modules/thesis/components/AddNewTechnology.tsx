import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IStackProps, IStackStyles, Stack } from "@fluentui/react";
import ConfirmAction from "./ConfirmAction";

// STYLES
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = {
  root: { width: 800 }
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 1000, alignItems: "center" as "center" } }
};

const AddNewTechnology: React.FunctionComponent = () => {
  let [empty, setEmpty] = React.useState(true);

  const getErrorMessage = (value: string): string => {
    if (value.length >= 1) {
      setEmpty(false);
      return "";
    } else {
      setEmpty(true);
      return `Cím megadása kötelező!`;
    }
  };

  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField
            label="Hozzáadandó technológia neve"
            required
            onGetErrorMessage={getErrorMessage}
            validateOnLoad={false}
          />
          <ConfirmAction notEmpty={empty}></ConfirmAction>
        </Stack>
      </Stack>
    </div>
  );
};

export default AddNewTechnology;
