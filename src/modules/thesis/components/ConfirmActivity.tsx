import * as React from "react";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { ContextualMenu } from "office-ui-fabric-react/lib/ContextualMenu";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DialogType, IconButton } from "@fluentui/react";

// megjelenő dialógusablak tulajdonságai
export enum MyDialogType {
  ACCEPT_APPLICATION,
  ADD_NEW_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  DELETE_PRACTICE,
  DELETE_TOPIC,
  DELETE_ALL_TOPICS,
  DENY_APPLICATION,
  WITHDRAW_APPLICATION
}

const getTitleToType = (dialogtype: MyDialogType): string => {
  switch (dialogtype) {
    case MyDialogType.ACCEPT_APPLICATION: {
      return "Jelentkezés elfogadása";
    }
    case MyDialogType.ADD_NEW_TECHNOLOGY: {
      return "Új technológia hozzáadása";
    }
    case MyDialogType.DELETE_TECHNOLOGY: {
      return "Meglevő technológia törlése";
    }
    case MyDialogType.DELETE_PRACTICE: {
      return "Meghirdetett szakmai gyakorlati hely törlése";
    }
    case MyDialogType.DELETE_TOPIC: {
      return "Meghirdetett téma törlése";
    }
    case MyDialogType.DELETE_ALL_TOPICS: {
      return "Lejárt témák törlése";
    }
    case MyDialogType.DENY_APPLICATION: {
      return "Jelentkezés elutasítása";
    }
    case MyDialogType.WITHDRAW_APPLICATION: {
      return "Jelentkezés visszavonása";
    }
  }
};

const getQuestionToType = (dialogtype: MyDialogType, name: string, count: number): string => {
  switch (dialogtype) {
    case MyDialogType.ACCEPT_APPLICATION: {
      return `Biztosan elfogadja "${name}" jelentkezését?`;
    }
    case MyDialogType.ADD_NEW_TECHNOLOGY: {
      return `Biztosan hozzá akarja adni "${name}" nevű technológiát a választható technológiák listájához?`;
    }
    case MyDialogType.DELETE_TECHNOLOGY: {
      return `Biztosan törölni szeretné a "${name}" nevű technológiát? Amennyiben vannak már hozzákapcsolt témák, akkor megszűnik a kapcsolatuk.`;
    }
    case MyDialogType.DELETE_PRACTICE: {
      return `Biztosan törölni szeretné a ${name} cég által nyújtott szakmai gyakorlatot?`;
    }
    case MyDialogType.DELETE_TOPIC: {
      return `Biztosan törölni szeretné a "${name}" nevű témát? A hozzá tartozó elfogadott/elutasított jelentkezések is törlődnek!`;
    }
    case MyDialogType.DELETE_ALL_TOPICS: {
      return `Biztosan töröl ${count} darab témát? A hozzá tartozó elfogadott/elutasított jelentkezések is törlődnek!`;
    }
    case MyDialogType.DENY_APPLICATION: {
      return `Biztosan elutasítja "${name}" jelentkezését?`;
    }
    case MyDialogType.WITHDRAW_APPLICATION: {
      return `Biztosan vissza akarod vonni a "${name}" nevű témára való jelentkezést?`;
    }
  }
};

const getJSXElementToType = (
  dialogtype: MyDialogType,
  toggleHideDialog: Function,
  count: number,
  notEmpty: boolean
): JSX.Element => {
  switch (dialogtype) {
    case MyDialogType.ACCEPT_APPLICATION: {
      return <PrimaryButton text="Elfogad" onClick={() => toggleHideDialog()} />;
    }
    case MyDialogType.ADD_NEW_TECHNOLOGY: {
      return (
        <PrimaryButton onClick={() => toggleHideDialog()} text="Hozzáadás" disabled={notEmpty} />
      );
    }
    case MyDialogType.DELETE_TECHNOLOGY: {
      return (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Töröl"
          ariaLabel="Töröl"
          onClick={() => toggleHideDialog()}
        />
      );
    }
    case MyDialogType.DELETE_PRACTICE: {
      return (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Töröl"
          ariaLabel="Töröl"
          onClick={() => toggleHideDialog()}
        />
      );
    }
    case MyDialogType.DELETE_TOPIC: {
      return (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Töröl"
          ariaLabel="Töröl"
          onClick={() => toggleHideDialog()}
        />
      );
    }
    case MyDialogType.DELETE_ALL_TOPICS: {
      return (
        <PrimaryButton
          text="Kijelöltek törlése"
          onClick={() => toggleHideDialog()}
          style={{ marginTop: "30px" }}
          disabled={count === 0}
          iconProps={{ iconName: "Delete" }}
        />
      );
    }
    case MyDialogType.DENY_APPLICATION: {
      return <DefaultButton text="Elutasít" onClick={() => toggleHideDialog()} />;
    }
    case MyDialogType.WITHDRAW_APPLICATION: {
      return (
        <IconButton
          iconProps={{ iconName: "Reply" }}
          title="Visszavonás"
          ariaLabel="Visszavonás"
          onClick={() => toggleHideDialog()}
        />
      );
    }
  }
};

const getButtonTextToType = (dialogtype: MyDialogType) => {
  switch (dialogtype) {
    case MyDialogType.ACCEPT_APPLICATION: {
      return "Elfogadás";
    }
    case MyDialogType.ADD_NEW_TECHNOLOGY: {
      return "Hozzáadás";
    }
    case MyDialogType.DELETE_TECHNOLOGY: {
      return "Törlés";
    }
    case MyDialogType.DELETE_PRACTICE: {
      return "Törlés";
    }
    case MyDialogType.DELETE_TOPIC: {
      return "Törlés";
    }
    case MyDialogType.DELETE_ALL_TOPICS: {
      return "Törlés";
    }
    case MyDialogType.DENY_APPLICATION: {
      return "Elutasítás";
    }
    case MyDialogType.WITHDRAW_APPLICATION: {
      return "Visszavonás";
    }
  }
};

const dialogStyles = { main: { maxWidth: 450 } };

const dragOptions = {
  moveMenuItemText: "Mozgatás",
  closeMenuItemText: "Bezárás",
  menu: ContextualMenu,
  keepInBounds: true
};

const dialogContentProps = (title: string, question: string) => {
  return {
    type: DialogType.normal,
    title: title,
    closeButtonAriaLabel: "Bezárás",
    subText: question
  };
};

interface ConfirmActivityProps {
  type: MyDialogType;
  id: string;
  name: string;
  onPositive: Function;
  notEmpty: boolean;
  updateTextField: Function;
  count: number;
}

const ConfirmActivity: React.FunctionComponent<ConfirmActivityProps> = (props) => {
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
      {getJSXElementToType(props.type, toggleHideDialog, props.count, props.notEmpty)}
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps(
          getTitleToType(props.type),
          getQuestionToType(props.type, props.name, props.count)
        )}
        modalProps={modalProps}
      >
        {props.type === MyDialogType.ACCEPT_APPLICATION ||
          (props.type === MyDialogType.DENY_APPLICATION && (
            <TextField label="Indoklás" multiline rows={3} />
          ))}
        <DialogFooter>
          <PrimaryButton
            onClick={() => props.onPositive(props.id, toggleHideDialog, props.updateTextField)}
            text={getButtonTextToType(props.type)}
          />
          <DefaultButton onClick={toggleHideDialog} text="Mégse" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmActivity;
