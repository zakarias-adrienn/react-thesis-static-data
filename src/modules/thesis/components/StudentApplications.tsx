import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import ConfirmWithdraw from "./ConfirmWithdraw";
import { Stack } from "office-ui-fabric-react";
import { HoverCard, HoverCardType } from "office-ui-fabric-react/lib/HoverCard";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { Icon, ScrollablePane, ScrollbarVisibility } from "@fluentui/react";
import { SelectionMode } from "@fluentui/react";
import { Application, ApplicationStatus } from "../model/application.model";
import { Language, Semester, Topic, TopicType } from "../model/topics.model";
import { convertSchoolSemesterToString } from "../helperFunctions";

// MINTA ADAT AHOGYAN MAJD AZ ADATBÁZISBÓL JÖN... REMÉLHETŐLEG
const myApplications: Application[] = [
  {
    id: "első",
    studentId: "a",
    topicId: "Youniversity",
    status: ApplicationStatus.Accepted,
    acceptReason:
      "Kérlek mihamarabb jelezz vissza, hogy mikor lenne megfelelő neked egy megbeszélés!"
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
  }
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "180px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  teacher: string;
  semester: string;
  status: string | JSX.Element;
  remove: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  columns: IColumn[];
  isFilter: boolean;
}

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px"
  },
  target: {
    display: "inline-block"
  }
});

class StudentApplications extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  private hoverCard: any;

  instantDismissCard = (): void => {
    if (this.hoverCard.current) {
      this.hoverCard.current.dismiss();
    }
  };

  onRenderPlainCard = (reason: string): JSX.Element => {
    return (
      <div className={classNames.plainCard}>
        Indoklás:
        <br />
        <br />
        {reason ? reason : "Nem adott meg indoklást a tanár."}
      </div>
    );
  };

  onCardHide = (): void => {
    console.log("I am now hidden");
  };

  constructor(props: {}) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    // getStudentApplications()
    this._allItems = [];
    myApplications.forEach((appl) => {
      const topicToApplication = topics.filter((topic) => topic.id === appl.topicId)[0];
      // ide a megfelelő tanárt is le kell marj kérni
      this._allItems.push({
        key: appl.id,
        title: topicToApplication.title,
        teacher: topicToApplication.teacherId,
        semester:
          topicToApplication.schoolSemester === null
            ? "tetszőleges"
            : convertSchoolSemesterToString(topicToApplication.schoolSemester),
        status: (
          <HoverCard
            cardDismissDelay={300}
            type={HoverCardType.plain}
            plainCardProps={{
              onRenderPlainCard: () =>
                this.onRenderPlainCard(appl.acceptReason ? appl.acceptReason : "")
            }}
            componentRef={this.hoverCard}
            onCardHide={this.onCardHide}
          >
            <>
              {appl.status === ApplicationStatus.Accepted ? <>Elfogadva</> : <>Elutasítva</>}
              <Icon className={classNames.target} iconName="StatusCircleQuestionMark"></Icon>
            </>
          </HoverCard>
        ),
        remove: (
          <ConfirmWithdraw
            myId={appl.id}
            onWithdraw={this.onDelete}
            name={topicToApplication.title}
          ></ConfirmWithdraw>
        )
      });
    });
    this._allItems = this._allItems.sort((a, b) => (a.title > b.title ? 1 : -1));

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column2",
        name: "Témavezető",
        fieldName: "teacher",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        isMultiline: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column4",
        name: "Státusz",
        fieldName: "status",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column5",
        name: "Visszavonás",
        fieldName: "remove",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      columns: this._columns,
      isFilter: false
    };
  }

  public onDelete(id: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== id),
      isFilter: this.state.isFilter
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
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
      <Fabric style={{ marginTop: "10px" }}>
        <TextField
          className={exampleChildClass}
          label="Cím szerinti szűrés:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <div style={{ height: "500px", position: "relative" }}>
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <DetailsList
              items={items}
              columns={this._columns}
              layoutMode={DetailsListLayoutMode.justified}
              setKey="none"
              selectionMode={SelectionMode.none}
            />
            {!this.state.items.length && !this.state.isFilter && (
              <Stack>
                <Text>Nem történt még egy témára sem jelentkezés!</Text>
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
    );
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

export default StudentApplications;
