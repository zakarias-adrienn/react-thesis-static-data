import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { hiddenContentStyle, mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { IconButton } from "@fluentui/react/lib/Button";

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);

interface ConfirmDeleteProps {
  text: string;
  technologies?: any[];
  which?: string;
  onDelete: Function;
}

const ConfirmAction: React.FunctionComponent<ConfirmDeleteProps> = (props) => {
  console.log(props.technologies);
  console.log(props.which);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");
  const dialogContentProps = {
    type: DialogType.normal,
    title:
      props.text === "technology" ? "Meglevő technológia törlése" : "Meghirdetett téma törlése",
    closeButtonAriaLabel: "Close",
    subText:
      props.text === "technology"
        ? "Biztosan törölni szeretné a technológiát?"
        : "Biztosan törölni szeretné a témát?"
  };

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
      <IconButton
        iconProps={{ iconName: "Delete" }}
        title="Töröl"
        ariaLabel="Töröl"
        onClick={toggleHideDialog}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => props.onDelete(props.which, toggleHideDialog)}
            text="Törlés"
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmAction;
