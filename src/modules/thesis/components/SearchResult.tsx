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
import { IconButton } from "@fluentui/react/lib/Button";
import { MessageBar } from "office-ui-fabric-react";
import { BrowserRouter, Link } from "react-router-dom";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

// tanár is tudjon menteni? nem kellene

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  teacher: string;
  semester: string;
  language: string;
  technologies: string;
  subjects: string;
  places: number | string;
  view: JSX.Element;
  addFavourite: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}

class SearchResult extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Garbage Collector működése Javában",
      title: "Garbage Collector működése Javában",
      teacher: "Kozsik Tamás",
      semester: "2020/21-ősz",
      language: "magyar",
      technologies: "Java",
      subjects: "Programozási nyelvek - Java",
      places: "Betelt",
      view: (
        <Link to={{ pathname: "/seeTopic/" + "1" }}>
          <IconButton iconProps={{ iconName: "RedEye" }} title="Megtekint" ariaLabel="Megtekint" />
        </Link>
      ),
      addFavourite: (
        <IconButton
          iconProps={{ iconName: "AddFavorite" }}
          title="Kedvencekhez ad"
          ariaLabel="Kedvencekhez ad"
        ></IconButton>
      )
    });
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      teacher: "Visnovitz Márton",
      semester: "2020/21-tavasz",
      language: "magyar",
      technologies: "React, Javascript",
      subjects: "Webprogramozás, \nKliensoldali webprogramozás",
      places: 4,
      view: (
        <Link to={{ pathname: "/seeTopic/" + "2" }}>
          <IconButton iconProps={{ iconName: "RedEye" }} title="Megtekint" ariaLabel="Megtekint" />
        </Link>
      ),
      addFavourite: (
        <IconButton
          iconProps={{ iconName: "AddFavorite" }}
          title="Kedvencekhez ad"
          ariaLabel="Kedvencekhez ad"
        ></IconButton>
      )
    });

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
        key: "column2",
        name: "Tanár",
        fieldName: "teacher",
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
        name: "Nyelv",
        fieldName: "language",
        minWidth: 30,
        maxWidth: 90,
        isResizable: true
      },
      {
        key: "column5",
        name: "Technológiák",
        fieldName: "technologies",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column6",
        name: "Tantárgyak",
        fieldName: "subjects",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column7",
        name: "Helyszám",
        fieldName: "places",
        minWidth: 10,
        maxWidth: 70,
        isResizable: true
      },
      {
        key: "column8",
        name: "Megtekintés",
        fieldName: "view",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column8",
        name: "Mentés",
        fieldName: "addFavourite",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails()
    };
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
        <MessageBar>Jelentkezni a téma részleteinek megtekintése során lehet.</MessageBar>
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
        ? this._allItems.filter((i) => i.title.toLowerCase().indexOf(text?.toLowerCase()) > -1)
        : this._allItems
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Kattintottak: ${item.title}`);
  };
}

export default SearchResult;
