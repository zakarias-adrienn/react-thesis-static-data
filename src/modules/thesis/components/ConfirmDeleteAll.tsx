import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton, IIconProps } from "office-ui-fabric-react";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";

const deleteIcon: IIconProps = { iconName: "Delete" };

// megjelenő dialógusablak dolgai
const dialogStyles = { main: { maxWidth: 200 } };

const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
  keepInBounds: true
};

const dialogContentProps = (number: number) => {
  return {
    type: DialogType.normal,
    title: "Lejárt témák törlése",
    closeButtonAriaLabel: "Close",
    subText: `Biztosan töröl ${number} darab témát? A hozzá(juk) tartozó jelentkezések státusza TÖRÖLTRE állítódik!`
  };
};

interface ConfirmDenyProps {
  count: number;
  onDelete: Function;
}

const ConfirmDeleteAll: React.FunctionComponent<ConfirmDenyProps> = (props) => {
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
        text="Kijelöltek törlése"
        onClick={toggleHideDialog}
        style={{ marginTop: "30px" }}
        disabled={props.count == 0}
        iconProps={deleteIcon}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(props.count)}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => props.onDelete(toggleHideDialog)} text="Törlés" />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteAll;
