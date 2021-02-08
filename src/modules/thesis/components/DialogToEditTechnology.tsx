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
  onSave?: any;
  myId?: string;
}

const DialogToEditTechnology: React.FunctionComponent<DialogProps> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [name, setName] = React.useState(props.name);

  function handleChange(e: any) {
    console.log(e.target);
    let element: React.ChangeEvent<HTMLInputElement> = e;
    console.log(element.target.value);
    setName(element.target.value);
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
        {/* formba kellene tenni valahogy? */}
        <TextField label="Név" value={name} onChange={handleChange} />
        <DialogFooter>
          <PrimaryButton
            onClick={(e) => props.onSave(name, props.myId, toggleHideDialog)}
            text="Mentés"
            disabled={name === ""}
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DialogToEditTechnology;
