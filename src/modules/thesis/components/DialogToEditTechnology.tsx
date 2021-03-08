import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { useBoolean } from "@uifabric/react-hooks";
import { IconButton } from "@fluentui/react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";

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

const DialogToEditTechnology: React.FunctionComponent<DialogProps> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [name, setName] = React.useState(props.name);
  const [disabled, setDisabled] = React.useState(false);

  // technologies-t le kell kérni - legalábbis az összes névre szükség van, hogy vizsgáljon hasonlókat, ugyanazt ne engedje hozzáadni
  function handleChange(e: any) {
    console.log(e.target);
    let element: React.ChangeEvent<HTMLInputElement> = e;
    console.log(element.target.value);
    setName(element.target.value);
  }

  function getErrorMessage(value: string): string {
    let technologyNames: string[] = [];
    if (value.trim().length >= 1 && !technologyNames.includes(value.trim().toLowerCase())) {
      setDisabled(false);
      return "";
    } else {
      setDisabled(true);
      return technologyNames.includes(value.trim().toLowerCase())
        ? `Ilyen nevű technológia már szerepel az adatbázisban!`
        : `Név megadása kötelező!`;
    }
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
      >
        <TextField
          label="Név"
          value={name}
          onChange={handleChange}
          required
          onGetErrorMessage={getErrorMessage}
        />
        <DialogFooter>
          <PrimaryButton
            onClick={(e) => props.onSave(name, props.myId, toggleHideDialog)}
            text="Mentés"
            disabled={disabled}
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogToEditTechnology;
