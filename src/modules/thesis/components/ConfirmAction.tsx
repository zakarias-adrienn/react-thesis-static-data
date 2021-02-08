import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
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
const dialogContentProps = {
  type: DialogType.normal,
  title: "Új technológia hozzáadása",
  closeButtonAriaLabel: "Close",
  subText: "Biztosan hozzá akarja adni a választható technológiák listájához?"
};

interface ConfirmActionProps {
  notEmpty?: boolean;
}

const ConfirmAction: React.FunctionComponent<ConfirmActionProps> = (props) => {
  console.log(props.notEmpty);
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
      <DefaultButton
        secondaryText="Opens the Sample Dialog"
        onClick={toggleHideDialog}
        text="Hozzáadás"
        disabled={props.notEmpty}
      />
      {/* <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label> */}

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={toggleHideDialog} text="Hozzzáadás" />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmAction;
