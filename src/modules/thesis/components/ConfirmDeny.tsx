import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { hiddenContentStyle, mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { TextField } from "office-ui-fabric-react/lib/TextField";

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = (name: string) => {
  return {
    type: DialogType.normal,
    title: "Jelentkezés elutasítása",
    closeButtonAriaLabel: "Close",
    subText: `Biztosan elutasítja "${name}" jelentkezését?`
  };
};

interface ConfirmDenyProps {
  myId: string;
  name: string;
  onDeny: Function;
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
      <DefaultButton text="Elutasít" onClick={toggleHideDialog} />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(props.name)}
        modalProps={modalProps}
      >
        <TextField label="Indoklás" multiline rows={3} />
        <DialogFooter>
          <PrimaryButton
            onClick={() => props.onDeny(props.myId, toggleHideDialog)}
            text="Elutasítás"
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmDeny;
