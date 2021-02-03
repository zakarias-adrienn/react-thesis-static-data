import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IStackProps, IStackStyles, Stack } from "@fluentui/react";
import ConfirmAction from "./ConfirmAction";

import TechnologyList from "./TechnologyList";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = {
  root: { width: 800 }
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 1000, alignItems: "center" as "center" } }
};

const AddNewTechnology: React.FunctionComponent = () => {
  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField label="Hozzáadandó technológia neve" />
          <ConfirmAction></ConfirmAction>
        </Stack>
      </Stack>
      <TechnologyList></TechnologyList>
    </div>
  );
};

export default AddNewTechnology;
