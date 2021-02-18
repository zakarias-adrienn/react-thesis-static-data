import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton, IIconProps } from "office-ui-fabric-react";
import { hiddenContentStyle, mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = (changed: boolean) => {
  return {
    type: DialogType.normal,
    title: "Módosítások mentése",
    closeButtonAriaLabel: "Close",
    subText: `${!changed ? "Figyelem! Nem történt módosítás!" : ""}`
  };
};

const saveIcon: IIconProps = { iconName: "Save" };

interface ConfirmModifyProps {
  disabled: boolean;
}

const ConfirmModify: React.FunctionComponent<ConfirmModifyProps> = (props) => {
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
      <PrimaryButton
        text="Mentés"
        type="submit"
        iconProps={saveIcon}
        allowDisabledFocus
        disabled={props.disabled}
        onClick={toggleHideDialog}
      ></PrimaryButton>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(false)}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Mentés" />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmModify;
