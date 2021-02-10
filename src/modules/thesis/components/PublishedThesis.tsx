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
import { IconButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@uifabric/react-hooks";
import { Link, BrowserRouter } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  semester: string;
  technologies: string;
  subjects: string;
  places: number;
  view: any;
  delete: any;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
  isFilter: boolean;
}

class PublishedThesis extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.onDelete = this.onDelete.bind(this);

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 20,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 10,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column4",
        name: "Technológiák",
        fieldName: "technologies",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column5",
        name: "Tantárgyak",
        fieldName: "subjects",
        minWidth: 30,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column6",
        name: "Helyszám",
        fieldName: "places",
        minWidth: 10,
        maxWidth: 90,
        isResizable: true
      },
      {
        key: "column7",
        name: "Szerkesztés",
        fieldName: "view",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column8",
        name: "Törlés",
        fieldName: "delete",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      }
    ];

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Garbage Collector működése Javában",
      title: "Garbage Collector működése Javában",
      semester: "2020/21-ősz",
      technologies: "Java",
      subjects: "Programozási nyelvek - Java",
      places: 2,
      view: (
        <BrowserRouter>
          <Link to="/editTopic/1">
            <IconButton iconProps={{ iconName: "Edit" }} title="Szerkeszt" ariaLabel="Szerkeszt" />
          </Link>
        </BrowserRouter>
      ),
      delete: (
        <ConfirmDelete
          text="topic"
          which="Garbage Collector működése Javában"
          onDelete={this.onDelete}
        ></ConfirmDelete>
      )
    });
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      semester: "2020/21-tavasz",
      technologies: "React, Javascript",
      subjects: "Webprogramozás, Kliensoldali webprogramozás",
      places: 4,
      view: <IconButton iconProps={{ iconName: "Edit" }} title="Szerkeszt" ariaLabel="Szerkeszt" />,
      delete: (
        <ConfirmDelete text="topic" which="Youniversity" onDelete={this.onDelete}></ConfirmDelete>
      )
    });

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      isFilter: false
    };
  }

  public onDelete(id: string, toggleHideDialog: any) {
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
            onItemInvoked={this._onItemInvoked}
          />
          {!this.state.items.length && !this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>Nincsenek még meghirdetett témák!</Text>
            </Stack>
          )}
          {!this.state.items.length && this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>Nincs a keresésnek megfelelő téma!</Text>
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

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Kattintottak: ${item.title}`);
  };
}

export default PublishedThesis;
