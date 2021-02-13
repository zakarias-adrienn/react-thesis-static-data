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
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from "office-ui-fabric-react";
import {
  DetailsHeader,
  IDetailsHeaderProps
} from "office-ui-fabric-react/lib/components/DetailsList/DetailsHeader";
import { ITooltipHostProps } from "office-ui-fabric-react/lib/Tooltip";
import {
  DetailsRow,
  IDetailsRowStyles,
  IDetailsListProps
} from "office-ui-fabric-react/lib/DetailsList";
import ConfirmDelete from "./ConfirmDelete";
import DialogToEditTechnology from "./DialogToEditTechnology";
import { IconButton } from "@fluentui/react/lib/Button";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "200px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
  isFilter: boolean;
}

class TechnologyTable extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this._columns = [
      {
        key: "column1",
        name: "Név",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column2",
        name: "Szerkesztés",
        fieldName: "edit",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column3",
        name: "Törlés",
        fieldName: "delete",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push(
      {
        key: "JAVA",
        name: "JAVA",
        edit: (
          <DialogToEditTechnology
            name="JAVA"
            myId="JAVA"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"JAVA"}></ConfirmDelete>
        )
      },
      {
        key: "C++",
        name: "C++",
        edit: (
          <DialogToEditTechnology
            name="C++"
            myId="C++"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"C++"}></ConfirmDelete>
        )
      },
      {
        key: "HTML5",
        name: "HTML5",
        edit: (
          <DialogToEditTechnology
            name="HTML5"
            myId="JAVA"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"HTML5"}></ConfirmDelete>
        )
      }
    );

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      isFilter: false
    };
  }

  public onChangeName(name: string, id: string, toggleHideDialog: Function) {
    // console.log(name);
    // console.log(id);
    // console.log(this.state);
    toggleHideDialog();
    this.setState({
      items: this.state.items.map((item) => (item.key === id ? { ...item, name } : item)),
      selectionDetails: this._getSelectionDetails(),
      isFilter: this.state.isFilter
    });
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
            // onItemInvoked={this._onItemInvoked}
          />
          {!this.state.items.length && !this.state.isFilter && (
            <Stack style={{ marginLeft: "30px" }}>
              <Text>Nincsenek még technológiák felvéve!</Text>
            </Stack>
          )}
          {!this.state.items.length && this.state.isFilter && (
            <Stack style={{ marginLeft: "30px" }}>
              <Text>Nincsen a keresésnek megfelelő eredmény!</Text>
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
        return "";
      case 1:
        return (
          "1 kiválasztott elem: " +
          (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).name
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
        ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text.toLowerCase()) === 0)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  // private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
  //   alert(`Kattintottak: ${item.name}`);
  // };
}

export default TechnologyTable;
