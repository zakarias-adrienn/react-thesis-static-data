import * as React from "react";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import ConfirmWithdraw from "./ConfirmWithdraw";
import { Stack } from "office-ui-fabric-react";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  teacher: string;
  status: string;
  remove: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
  isFilter: boolean;
}

// const KeyCellWithHoverCard: React.FunctionComponent<{ item: IExampleItem }> = ({ item }) => {
//   const [contentRendered, { toggle: toggleContentRendered }] = useBoolean(false);
//   const targetElementRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
//   const expandingCardProps: IExpandingCardProps = useConst({
//     onRenderCompactCard,
//     onRenderExpandedCard,
//     renderData: item,
//     directionalHint: DirectionalHint.rightTopEdge,
//     gapSpace: 16,
//     calloutProps: {
//       isBeakVisible: true
//     }
//   });
//   React.useEffect(toggleContentRendered, [toggleContentRendered]);

//   return (
//     <div className={classNames.item}>
//       <div ref={targetElementRef} data-is-focusable>
//         {item.key}
//         {contentRendered && (
//           <HoverCard
//             expandingCardProps={expandingCardProps}
//             target={targetElementRef.current}
//             cardDismissDelay={300}
//             onCardVisible={log("onCardVisible")}
//             onCardHide={log("onCardHide")}
//             trapFocus
//             openHotKey={KeyCodes.enter}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

class UserThemes extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.onDelete = this.onDelete.bind(this);

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      teacher: "Visnovitz Márton",
      status: "Elfogadva",
      remove: <ConfirmWithdraw myId="Youniversity" onWithdraw={this.onDelete}></ConfirmWithdraw>
    });
    this._allItems.push({
      key: "TDK Dolgozat",
      title: "TDK Dolgozat",
      teacher: "Pusztai Kinga",
      status: "Elutasítva",
      remove: <ConfirmWithdraw myId="TDK Dolgozat" onWithdraw={this.onDelete}></ConfirmWithdraw>
    });

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column2",
        name: "Témavezető",
        fieldName: "teacher",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column3",
        name: "Státusz",
        fieldName: "status",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column4",
        name: "Visszavonás",
        fieldName: "remove",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      isFilter: false
    };
  }

  public onDelete(id: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== id),
      selectionDetails: this._getSelectionDetails(),
      isFilter: this.state.isFilter
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
  }

  // public renderRow(
  //   item: IDetailsListBasicExampleItem,
  //   index: number,
  //   column: IColumn
  // ): JSX.Element | React.ReactText {
  //   if (column.key === "key") {
  //     return <KeyCellWithHoverCard item={item} />;
  //   }
  //   return item;
  // }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <Fabric>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        <TextField
          className={exampleChildClass}
          label="Cím szerinti szűrés:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            // onRenderRow={this.renderRow}
          />
          {!this.state.items.length && !this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>Nem történt még egy témára sem jelentkezés!</Text>
            </Stack>
          )}
          {!this.state.items.length && this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>Nincs a keresésnek megfelelő jelentkezés!</Text>
            </Stack>
          )}
        </MarqueeSelection>
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "Nincs kiválasztva elem";
      case 1:
        return (
          "1 kiválasztott elem: " +
          (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).title
        );
      default:
        return `${selectionCount} darab elem kiválasztva`;
    }
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.title.toLowerCase().indexOf(text.toLowerCase()) > -1)
        : this._allItems,
      isFilter: text ? true : false
    });
  };
}

export default UserThemes;

// TODO: ha elutasítva, hogy jelenjen meg az indoklás?
