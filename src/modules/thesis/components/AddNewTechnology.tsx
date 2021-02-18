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

interface AddProps {
  onAddNew: Function;
  name: string;
}

const AddNewTechnology: React.FunctionComponent<AddProps> = (props) => {
  let [empty, setEmpty] = React.useState(true);
  const [name, setName] = React.useState(props.name);

  const getErrorMessage = (value: string): string => {
    if (value.length >= 1) {
      setEmpty(false);
      return "";
    } else {
      setEmpty(true);
      return `Cím megadása kötelező!`;
    }
  };

  function handleChange(e: any) {
    console.log(e.target);
    let element: React.ChangeEvent<HTMLInputElement> = e;
    console.log(element.target.value);
    setName(element.target.value);
  }

  function updateState() {
    setName("");
  }

  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField
            label="Hozzáadandó technológia neve"
            required
            onGetErrorMessage={getErrorMessage}
            validateOnLoad={false}
            value={name}
            onChange={handleChange}
          />
          <ConfirmAction
            notEmpty={empty}
            onAddNew={props.onAddNew}
            name={name}
            updateTextField={updateState}
          ></ConfirmAction>
        </Stack>
      </Stack>
    </div>
  );
};

export default AddNewTechnology;
