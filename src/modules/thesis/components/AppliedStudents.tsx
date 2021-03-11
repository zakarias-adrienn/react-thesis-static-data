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

// saját importok
import { Application, ApplicationStatus } from "../model/application.model";
import ConfirmDeny from "./ConfirmDeny";
import ConfirmAccept from "./ConfirmAccept";
import AcceptedStudents from "./AcceptedStudents";
import { Language, Semester, Topic, TopicType } from "../model/topics.model";
import { convertSchoolSemesterToString } from "../helperFunctions";

// MINTA ADAT AHOGYAN MAJD AZ ADATBÁZISBÓL JÖN... REMÉLHETŐLEG
const myApplications: Application[] = [
  {
    id: "első",
    studentId: "Szemenyei Mónika",
    topicId: "Youniversity",
    status: ApplicationStatus.Accepted,
    acceptReason:
      "Kérlek mihamarabb jelezz vissza, hogy mikor lenne megfelelő neked egy megbeszélés!"
  },
  {
    id: "második",
    studentId: "Zakariás Adrienn",
    topicId: "Application1",
    status: ApplicationStatus.Pending
  }
];
const topics: Topic[] = [
  {
    id: "Youniversity",
    type: [TopicType.BScThesis],
    title: "Youniversity",
    description: "Valami...",
    teacherId: "Visnovitz Márton",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 2,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: ["a"],
    language: [Language.Hungarian]
  },
  {
    id: "Application1",
    type: [TopicType.BScThesis],
    title: "Application1",
    description: "Valami...",
    teacherId: "Visnovitz Márton",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 2,
    schoolSemester: {
      year: 2022,
      half: Semester.Spring
    },
    appliedStudentIds: ["a"],
    language: [Language.Hungarian]
  }
];

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
          <ConfirmAccept
            name={appl.studentId}
            myId={appl.id}
            onAccept={this.handleAccept}
          ></ConfirmAccept>
        ),
        deny: <ConfirmDeny name={appl.studentId} myId={appl.id} onDeny={this.onDeny}></ConfirmDeny>
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
      isFilter: false
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

  public onDeny(myId: string, toggleHideDialog: any) {
    toggleHideDialog();
    // a jelentkezés statászt be kell állítani - hogy? lekérem a jelentkezést? getApplianceById.action? + beállítom a státuszt + felküldöm?
    // denyAppliance.action? - ha van denyReason azt is beállítom? - emailt küldtem, még nincs válasz
    this.setState({
      items: this.state.items.filter((item) => item.key !== myId)
    });
    this._allItems = this._allItems.filter((item) => item.key !== myId);
  }

  public handleAccept(key: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== key)
    });
    let title: string = this._allItems.filter((item) => item.key === key)[0].title;
    let student: string = this._allItems.filter((item) => item.key === key)[0].name;
    let semester: string = this._allItems.filter((item) => item.key === key)[0].semester;
    this._allItems = this._allItems.filter((item) => item.key !== key);
    // a key-t kell majd csak átadnom, az alapján lekéri majd a komponens
    this.acceptedStudents.updateState(key, title, student, semester);
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
