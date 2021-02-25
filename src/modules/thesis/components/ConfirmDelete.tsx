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
  type: string;
  which: string; //id
  name: string;
  onDelete: Function;
}

const ConfirmAction: React.FunctionComponent<ConfirmDeleteProps> = (props) => {
  console.log(props.which);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");
  const dialogContentProps = {
    type: DialogType.normal,
    title:
      props.type === "technology" ? "Meglevő technológia törlése" : "Meghirdetett téma törlése",
    closeButtonAriaLabel: "Close",
    subText:
      props.type === "technology"
        ? `Biztosan törölni szeretné a "${props.name}" nevű technológiát? Amennyiben vannak már hozzákapcsolt témák, akkor megszűnik a kapcsolatuk.`
        : `Biztosan törölni szeretné a "${props.name}" nevű témát?`
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
