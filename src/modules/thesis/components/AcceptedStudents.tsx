import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";

// saját importok
import { Application, ApplicationStatus } from "../model/application.model";
import { convertSchoolSemesterToString } from "../helperFunctions";
import { exampleApplications as myApplications } from "../exampleData";
import { exampleTopics as topics } from "../exampleData";

// elfogadott jelentkezések kiszűrése - TODO: használni majd
const _getAcceptedApplications = (applications: Application[]): Application[] => {
  return applications.filter((appli) => appli.status === ApplicationStatus.Accepted);
};

const acceptedApplications = _getAcceptedApplications(myApplications);

// MEZŐK STÍLUSAI
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "200px", float: "left", paddingRight: "20px", paddingLeft: "0px" }
};

// LISTA ELEMEK TÍPUSA
export interface DetailsListItemType {
  key: string;
  title: string;
  semester: string;
  name: string;
}

// TÁBLÁZAT ÁLLAPOTÁNAK TÍPUSA
export interface DetailsListStateType {
  items: DetailsListItemType[];
  columns: IColumn[];
  isFilter: boolean;
}

class AcceptedStudents extends React.Component<{}, DetailsListStateType> {
  // MEZŐK
  private _allItems: DetailsListItemType[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    // BINDOLT METÓDUSOK
    this.updateState = this.updateState.bind(this);

    this._allItems = [];
    acceptedApplications.forEach((appl) => {
      const topicToApplication = topics.filter((topic) => topic.id === appl.topicId)[0];
      // TODO: student lekérése id alapján
      this._allItems.push({
        key: appl.id,
        title: topicToApplication.title,
        name: appl.studentId,
        semester:
          topicToApplication.schoolSemester === null
            ? "tetszőleges"
            : convertSchoolSemesterToString(topicToApplication.schoolSemester)
      });
    });
    this._allItems.sort((a, b) => (a.title > b.title ? 1 : -1));

    // OSZLOPOK TÍPUSA
    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column2",
        name: "Hallgató",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
        onColumnClick: this._onColumnClick
      }
    ];

    // ÁLLAPOT BEÁLLÍTÁSA
    this.state = {
      items: this._allItems,
      columns: this._columns,
      isFilter: false
    };
  }

  // FÜGGVÉNYEK
  // fixen maradó header görgetéskor
  private onRenderDetailsHeader(props: any, defaultRender: any) {
    if (!props) {
      return null;
    }
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender!({
          ...props
        })}
      </Sticky>
    );
  }

  // ha a felső táblázatban elfogad valakit, akkor átkerül a jelentkezése az alsó táblázatba
  public updateState(key: string, title: string, name: string, semester: string) {
    let acceptedItem: DetailsListItemType = {
      key: key,
      title: title,
      name: name,
      semester: semester
    };
    let newState = [...this.state.items, acceptedItem];
    newState = newState.sort((a, b) => (a.title > b.title ? 1 : -1));
    this.setState({
      items: newState
    });
    this._allItems.push(acceptedItem);
    this._allItems = this._allItems.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // szűrések - nem csak kezdeti egyezés, hanem belső egyezéseket is vizsgál
  private _onFilterByTitle = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.title.toLowerCase().indexOf(text?.toLowerCase()) > -1)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  private _onFilterByStudentName = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    console.log(this.state.items);
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text?.toLowerCase()) > -1)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems
    });
  };

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <>
        <h3>Elfogadott jelentkezések</h3>
        <Fabric>
          <div className="ms-Grid" dir="ltr" style={{ overflow: "hidden" }}>
            <TextField
              label="Cím szerinti szűrés:"
              onChange={this._onFilterByTitle}
              styles={textFieldStyles}
            />
            <TextField
              label="Hallgató szerinti szűrés:"
              onChange={this._onFilterByStudentName}
              styles={textFieldStyles}
            />
          </div>
          <div style={{ height: "200px", position: "relative" }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <DetailsList
                items={items}
                columns={this._columns}
                setKey="none"
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                selectionPreservedOnEmptyClick={true}
                onRenderDetailsHeader={this.onRenderDetailsHeader}
              />
              {!this.state.items.length && !this.state.isFilter && (
                <Stack horizontalAlign="center">
                  <Text>
                    Jelenleg nincsen függőben levő jelentkezés egyetlen meghirdetett saját témára
                    sem!
                  </Text>
                </Stack>
              )}
              {!this.state.items.length && this.state.isFilter && (
                <Stack>
                  <Text>Nincs a keresésnek megfelelő jelentkezés!</Text>
                </Stack>
              )}
            </ScrollablePane>
          </div>
        </Fabric>
      </>
    );
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

export default AcceptedStudents;
