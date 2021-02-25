import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { IconButton } from "@fluentui/react/lib/Button";
import { MessageBar } from "office-ui-fabric-react";
import { BrowserRouter, Link } from "react-router-dom";
import { SelectionMode } from "@fluentui/react";
import SeeTheme from "./SeeTheme";

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
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  seeTheme: boolean;
  seeTopicId: string;
}

type Prop = {
  hideHeaderSearch: Function;
};

class SearchResult extends React.Component<Prop, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: Prop) {
    super(props);

    this.setSeeTheme = this.setSeeTheme.bind(this);
    this.onBackToSearch = this.onBackToSearch.bind(this);

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
        // így nem veszik el a keresés eredménye, de a keresés felül ott lesz
        <IconButton
          iconProps={{ iconName: "RedEye" }}
          title="Megtekint"
          ariaLabel="Megtekint"
          onClick={() => this.setSeeTheme("Garbage Collector műküdése Javában")}
        />
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
        // lehet így linkkel lekérni, de visszakor elveszik a keresés eredménye
        <Link to={{ pathname: "/seeTopic/" + "2" }}>
          <IconButton iconProps={{ iconName: "RedEye" }} title="Megtekint" ariaLabel="Megtekint" />
        </Link>
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
      }
    ];

    this.state = {
      items: this._allItems,
      seeTheme: false,
      seeTopicId: ""
    };
  }

  private setSeeTheme(id: string) {
    this.props.hideHeaderSearch();
    this.setState({
      ...this.state,
      seeTheme: true,
      seeTopicId: id
    });
  }

  private onBackToSearch() {
    this.props.hideHeaderSearch();
    this.setState({
      ...this.state,
      seeTheme: false,
      seeTopicId: ""
    });
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <Fabric>
        {!this.state.seeTheme ? (
          <>
            <MessageBar>Jelentkezni a téma részleteinek megtekintése során lehet.</MessageBar>
            <DetailsList
              items={items}
              columns={this._columns}
              layoutMode={DetailsListLayoutMode.justified}
              setKey="none"
              selectionMode={SelectionMode.none}
            />
          </>
        ) : (
          <SeeTheme onBack={this.onBackToSearch} id={this.state.seeTopicId}></SeeTheme>
        )}
      </Fabric>
    );
  }
}

export default SearchResult;
