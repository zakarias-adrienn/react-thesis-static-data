import * as React from "react";
import { useId, useBoolean } from "@uifabric/react-hooks";
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  DefaultButton,
  Modal,
  IDragOptions,
  IconButton,
  IIconProps
} from "office-ui-fabric-react";

const dragOptions: IDragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu
};
const cancelIcon: IIconProps = { iconName: "Cancel" };

interface ModalProps {
  title: string;
  content: JSX.Element;
}

const InfoModal: React.FunctionComponent<ModalProps> = (props) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);

  const titleId = useId(props.title);

  return (
    <div>
      <DefaultButton
        onClick={showModal}
        text={props.title}
        style={{ width: "100%", height: "80px" }}
      />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
        dragOptions={isDraggable ? dragOptions : undefined}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>{props.title}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Bezárás"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>{props.content}</div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch"
  },
  header: [
    theme.fonts.large,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px"
    }
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      "p": { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 }
    }
  }
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px"
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
};

export default InfoModal;
