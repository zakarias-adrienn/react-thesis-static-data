import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { TextField } from "office-ui-fabric-react/lib/TextField";

// megjelenő dialógusablak dolgai
const dialogStyles = { main: { maxWidth: 450 } };

const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};

const dialogContentProps = (name: string) => {
  return {
    type: DialogType.normal,
    title: "Jelentkezés elfogadása",
    closeButtonAriaLabel: "Close",
    subText: `Biztosan elfogadja "${name}" jelentkezését?`
  };
};

interface ConfirmDenyProps {
  myId: string;
  name: string;
  onAccept: Function;
}

const ConfirmDeny: React.FunctionComponent<ConfirmDenyProps> = (props) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined
    }),
    [isDraggable, labelId, subTextId]
  );

  return (
    <>
      <PrimaryButton text="Elfogad" onClick={toggleHideDialog} />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(props.name)}
        modalProps={modalProps}
      >
        <TextField label="Indoklás" multiline rows={3} />
        <DialogFooter>
          <PrimaryButton
            onClick={() => props.onAccept(props.myId, toggleHideDialog)}
            text="Elfogadás"
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmDeny;
