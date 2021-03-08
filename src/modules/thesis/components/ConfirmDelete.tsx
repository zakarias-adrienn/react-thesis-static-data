import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { IconButton } from "@fluentui/react/lib/Button";

// megjelenő dialógusablak dolgai
const dialogStyles = { main: { maxWidth: 450 } };

const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};

interface ConfirmDeleteProps {
  type: string;
  id: string; //id
  name: string;
  onDelete: Function;
}

// TECHNOLÓGIA ÉS TÉMA TÖRLÉSÉRE IS HASZNÁLVA VAN
// TÉMA CSAK AKKOR TÖRLŐDJÖN HA NINCS RÁ FÜGGŐBEN LEVŐ JELENTKEZÉS?
const ConfirmDelete: React.FunctionComponent<ConfirmDeleteProps> = (props) => {
  console.log(props.id);
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
          <PrimaryButton onClick={() => props.onDelete(props.id, toggleHideDialog)} text="Törlés" />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmDelete;
