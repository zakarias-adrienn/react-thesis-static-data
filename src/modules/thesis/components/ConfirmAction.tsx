import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";

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
    title: "Új technológia hozzáadása",
    closeButtonAriaLabel: "Close",
    subText: `Biztosan hozzá akarja adni "${name}" nevű technológiát a választható technológiák listájához?`
  };
};

interface ConfirmActionProps {
  notEmpty: boolean;
  onAddNew: Function;
  name: string;
  updateTextField: Function;
}

const ConfirmAction: React.FunctionComponent<ConfirmActionProps> = (props) => {
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
      <PrimaryButton onClick={toggleHideDialog} text="Hozzáadás" disabled={props.notEmpty} />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(props.name)}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => props.onAddNew(props.name, toggleHideDialog, props.updateTextField)}
            text="Hozzzáadás"
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmAction;
