import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Stack } from "office-ui-fabric-react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";
import { MessageBar, MessageBarType } from "@fluentui/react";

// saját importok
import { Application, ApplicationStatus } from "../model/application.model";
import AcceptedStudents from "./AcceptedStudents";
import { convertSchoolSemesterToString } from "../helperFunctions";
import { exampleApplications as myApplications } from "../exampleData";
import { exampleTopics as topics } from "../exampleData";
import ConfirmActivity, { MyDialogType } from "./ConfirmActivity";

// Függőben levő jelentkezések kiszűrése
const _getPendingApplications = (applications: Application[]): Application[] => {
  return applications.filter((appli) => appli.status === ApplicationStatus.Pending);
};

const pendingApplications = _getPendingApplications(myApplications);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// STÍLUSOK
const textFieldStyle = mergeStyles({
  display: "block",
  marginBottom: "10px"
});
const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "180px" } };

// MEGERŐSÍTŐ ÜZENETEK
const SuccessonAcceptMessage = () => (
  <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
    Sikeresen elfogadva lett egy jelentkezés!
  </MessageBar>
);
const SuccessonDenyMessage = () => (
  <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
    Elutasítva lett egy jelentkezés!
  </MessageBar>
);

// TÍPUSOK
export interface DetailsListItemType {
  key: string;
  title: string;
  name: string;
  semester: string;
  accept: JSX.Element;
  deny: JSX.Element;
}

export interface DetailsListState {
  items: DetailsListItemType[];
  columns: IColumn[];
  isFilter: boolean;
  successOnAccept: boolean;
  successOnDeny: boolean;
}

class AppliedStudents extends React.Component<{}, DetailsListState> {
  // MEZŐK
  private _allItems: DetailsListItemType[];
  private _columns: IColumn[];
  private acceptedStudents: any;

  constructor(props: {}) {
    super(props);

    // BINDOLT METÓDUSOK
    this.onDeny = this.onDeny.bind(this);
    this.handleAccept = this.handleAccept.bind(this);

    // Application[] jön majd le a db-ből -> ki kell szűrni azokat amik nincsenek elfogadva
    this._allItems = [];
    pendingApplications.forEach((appl) => {
      const topicToApplication = topics.filter((topic) => topic.id === appl.topicId)[0];
      // TODO: student lekérése id alapján
      this._allItems.push({
        key: appl.id,
        title: topicToApplication.title,
        name: appl.studentId,
        semester:
          topicToApplication.schoolSemester === null
            ? "tetszőleges"
            : convertSchoolSemesterToString(topicToApplication.schoolSemester),
        accept: (
          <ConfirmActivity
            name={appl.studentId}
            id={appl.id}
            onPositive={this.handleAccept}
            type={MyDialogType.ACCEPT_APPLICATION}
            notEmpty={true}
            count={0}
            updateTextField={() => {}}
          ></ConfirmActivity>
        ),
        deny: (
          <ConfirmActivity
            name={appl.studentId}
            id={appl.id}
            onPositive={this.onDeny}
            type={MyDialogType.DENY_APPLICATION}
            count={0}
            updateTextField={() => {}}
            notEmpty={true}
          ></ConfirmActivity>
        )
      });
    });
    this._allItems.sort((a, b) => (a.title > b.title ? 1 : -1));

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
      },
      {
        key: "column4",
        name: "Elfogadás",
        fieldName: "accept",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column5",
        name: "Elutasítás",
        fieldName: "deny",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      columns: this._columns,
      isFilter: false,
      successOnAccept: false,
      successOnDeny: false
    };
  }

  // FÜGGVÉNYEK
  // táblázat headerje görgetéskor fix legyen
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

  public onDeny(id: string, toggleHideDialog: Function, updateTextField: Function) {
    toggleHideDialog();
    // a jelentkezés statászt be kell állítani - hogy? lekérem a jelentkezést? getApplianceById.action? + beállítom a státuszt + felküldöm?
    // denyAppliance.action? - ha van denyReason azt is beállítom? - emailt küldtem, még nincs válasz
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.key !== id),
      successOnDeny: true
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
    setTimeout(() => this.setState({ ...this.state, successOnDeny: false }), 4000);
  }

  public handleAccept(id: string, toggleHideDialog: Function, updateTextField: Function) {
    toggleHideDialog();
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.key !== id),
      successOnAccept: true
    });
    let title: string = this._allItems.filter((item) => item.key === id)[0].title;
    let student: string = this._allItems.filter((item) => item.key === id)[0].name;
    let semester: string = this._allItems.filter((item) => item.key === id)[0].semester;
    this._allItems = this._allItems.filter((item) => item.key !== id);
    // a key-t kell majd csak átadnom, az alapján lekéri majd a komponens
    this.acceptedStudents.updateState(id, title, student, semester);
    setTimeout(() => this.setState({ ...this.state, successOnAccept: false }), 4000);
  }

  private _onFilter = (
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
      <div className="ms-Grid" dir="ltr" style={{ marginTop: "10px" }}>
        <h3>Függőben levő jelentkezések</h3>
        <Fabric>
          <TextField
            className={textFieldStyle}
            label="Cím szerinti szűrés:"
            onChange={this._onFilter}
            styles={textFieldStyles}
          />
          <div style={{ height: "30px" }}>
            {this.state.successOnAccept ? <SuccessonAcceptMessage /> : null}
            {this.state.successOnDeny ? <SuccessonDenyMessage /> : null}
          </div>
          <div style={{ height: "200px", position: "relative" }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <DetailsList
                items={items}
                columns={this._columns}
                setKey="none"
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                onRenderDetailsHeader={this.onRenderDetailsHeader}
              />
              {!this.state.items.length && !this.state.isFilter && (
                <Stack>
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
        <br />
        <br />
        {/* itt jelenítődik meg a AcceptedStudents komponens is, lehet jobb lenne refaktorálni majd */}
        <AcceptedStudents ref={(ele) => (this.acceptedStudents = ele)}></AcceptedStudents>
        <br />
      </div>
    );
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

export default AppliedStudents;
