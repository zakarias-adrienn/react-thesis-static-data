import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IStackProps, IStackStyles, Stack } from "@fluentui/react";
import ConfirmAction from "./ConfirmAction";

// STYLES
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = {
  root: { width: "100%", textAlign: "center" }
};
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: "30%", margin: "auto" } }
};

interface AddProps {
  onAddNew: Function;
  name: string;
}

const AddNewTechnology: React.FunctionComponent<AddProps> = (props) => {
  let [empty, setEmpty] = React.useState(true);
  const [name, setName] = React.useState(props.name);
  const [reset, setReset] = React.useState(false);

  const getErrorMessage = (value: string): string => {
    if (reset === true || value.trim().length >= 1) {
      setEmpty(false);
      return "";
    } else {
      setEmpty(true);
      return `Név megadása kötelező! Nem lehet üres!`;
    }
  };

  function handleChange(e: any) {
    setReset(false);
    console.log(e.target);
    let element: React.ChangeEvent<HTMLInputElement> = e;
    console.log(element.target.value);
    setName(element.target.value);
  }

  function updateState() {
    setName("");
    setReset(true);
  }

  return (
    <div>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <form id="addTechnology">
            <TextField
              label="Hozzáadandó technológia neve"
              required
              onGetErrorMessage={getErrorMessage}
              validateOnLoad={false}
              value={name}
              onChange={handleChange}
            />
          </form>
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
