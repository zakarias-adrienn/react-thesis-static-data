import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IStackProps, IStackStyles, Stack } from "@fluentui/react";
import ConfirmAction from "./ConfirmAction";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";

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
  technologies: any;
}

const AddNewTechnology: React.FunctionComponent<AddProps> = (props) => {
  let [empty, setEmpty] = React.useState(true);
  const [name, setName] = React.useState(props.name);
  const [reset, setReset] = React.useState(false);
  const [similarTechnologies, setSimilarTechnologies] = React.useState([]);
  let technologiesOriginalNames = props.technologies.map((item: any) => item.name);
  let technologySmallNames = props.technologies.map((item: any) => item.name.toLowerCase());

  // technológiákat megkaphatja propként vagy useState-adatbázisból

  const getErrorMessage = (value: string): string => {
    if (
      (reset === true || value.trim().length >= 1) &&
      !technologySmallNames.includes(value.trim().toLowerCase())
    ) {
      setEmpty(false);
      return "";
    } else {
      setEmpty(true);
      return value.trim().length >= 1 && technologySmallNames.includes(value.trim().toLowerCase())
        ? `Ilyen nevű technológia már szerepel az adatbázisban!`
        : `Név megadása kötelező! Nem lehet üres!`;
    }
  };

  function handleChange(e: any) {
    setReset(false);
    console.log(e.target);
    let element: React.ChangeEvent<HTMLInputElement> = e;
    console.log(element.target.value);
    setName(element.target.value);

    let value = element.target.value.toLowerCase().trim();

    if (value.length > 0) {
      setSimilarTechnologies(
        technologiesOriginalNames.filter((name: string) => name.toLowerCase().startsWith(value))
      );
    }
  }

  function updateState() {
    setName("");
    setReset(true);
    setSimilarTechnologies([]);
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
            {similarTechnologies.length > 0 && !empty && (
              <>
                <br />
                <MessageBar
                  messageBarType={MessageBarType.warning}
                  isMultiline={false}
                  dismissButtonAriaLabel="Close"
                >
                  Hasonló létező technológiák: <span></span>
                  {similarTechnologies.map((name) => (
                    <span style={{ fontWeight: "bold" }}>{name + " "}</span>
                  ))}
                </MessageBar>
              </>
            )}
          </form>
          <ConfirmAction
            notEmpty={empty || reset}
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
