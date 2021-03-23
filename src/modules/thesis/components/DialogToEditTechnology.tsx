import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { useBoolean } from "@uifabric/react-hooks";
import { IconButton } from "@fluentui/react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { exampleTechnologies } from "../exampleData";

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } }
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: "Technológia módosítása"
};

interface DialogProps {
  name: string;
  onSave: Function;
  myId: string;
}

const getStyles = {
  main: [
    {
      selectors: {
        ["@media (min-width: 480px)"]: {
          maxWidth: "400px",
          minWidth: "400px"
        }
      }
    }
  ]
};

const DialogToEditTechnology: React.FunctionComponent<DialogProps> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [name, setName] = React.useState(props.name);
  const [disabled, setDisabled] = React.useState(false);
  const [similarTechnologies, setSimilarTechnologies] = React.useState<string[]>([]);
  let technologiesOriginalNames = exampleTechnologies.map((item: any) => item.name);

  // technologies-t le kell kérni - legalábbis az összes névre szükség van, hogy vizsgáljon hasonlókat, ugyanazt ne engedje hozzáadni
  function handleChange(e: any) {
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

  function getErrorMessage(value: string): string {
    let technologyNames: string[] = exampleTechnologies.map((t) => t.name.trim().toLowerCase());
    let toTestTechnologyNames = technologyNames.filter(
      (t) => t !== props.name.trim().toLowerCase()
    );
    if (value.trim().length >= 1 && !toTestTechnologyNames.includes(value.trim().toLowerCase())) {
      setDisabled(false);
      return "";
    } else {
      setDisabled(true);
      if (technologyNames.includes(value.trim().toLowerCase())) {
        return `Ilyen nevű technológia már szerepel az adatbázisban!`;
      } else {
        setSimilarTechnologies([]);
        return `Név megadása kötelező!`;
      }
    }
  }

  function setDefault() {
    setTimeout(() => {
      setName(props.name);
      toggleHideDialog();
      setSimilarTechnologies([]);
    }, 100);
  }

  return (
    <>
      <IconButton
        iconProps={{ iconName: "Edit" }}
        title="Szerkeszt"
        ariaLabel="Szerkeszt"
        onClick={toggleHideDialog}
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
        styles={getStyles}
      >
        <TextField
          label="Név"
          value={name}
          onChange={handleChange}
          required
          onGetErrorMessage={getErrorMessage}
        />
        {similarTechnologies.length > 0 && (
          <>
            <br />
            <MessageBar
              messageBarType={MessageBarType.warning}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
              Hasonló létező technológiák: <span></span>
              {similarTechnologies.map((name) => (
                <>
                  <span style={{ fontWeight: "bold" }}>{name + " "}</span>
                  &nbsp;&nbsp;
                </>
              ))}
            </MessageBar>
          </>
        )}
        <DialogFooter>
          <PrimaryButton
            onClick={(e) => props.onSave(name, props.myId, toggleHideDialog)}
            text="Mentés"
            disabled={disabled}
          />
          <DefaultButton onClick={() => setDefault()} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogToEditTechnology;
