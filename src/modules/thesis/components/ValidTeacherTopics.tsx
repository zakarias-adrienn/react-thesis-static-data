import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";
import { IconButton } from "@fluentui/react/lib/Button";
import { Link } from "react-router-dom";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";

// saját importok
import { Topic } from "../model/topics.model";
import ConfirmDelete from "./ConfirmDelete";
import { convertSchoolSemesterToString } from "../helperFunctions";
import ConfirmDeleteAll from "./ConfirmDeleteAll";

const textFieldStyle = mergeStyles({
  display: "block",
  marginBottom: "10px",
  marginLeft: "50px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "180px" } };

export interface DetailsListItem {
  key: string;
  title: string;
  semester: string;
  technologies: string;
  subjects: string;
  places: number;
  view: JSX.Element;
  delete: JSX.Element;
}

export interface DetailsListState {
  items: DetailsListItem[];
  columns: IColumn[];
  isFilter: boolean;
  selectionDetails: string;
}

type Prop = {
  topics: Topic[];
};

class ValidTeacherTopics extends React.Component<Prop, DetailsListState> {
  private _selection: Selection;
  private _allItems: DetailsListItem[];
  private _columns: IColumn[];

  constructor(props: any) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ ...this.state, selectionDetails: this._getSelectionDetails() })
    });

    this.onDelete = this.onDelete.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
    this.getDeleteIds = this.getDeleteIds.bind(this);

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
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 10,
        maxWidth: 100,
        isResizable: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column4",
        name: "Technológiák",
        fieldName: "technologies",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true,
        isMultiline: true
      },
      {
        key: "column5",
        name: "Tantárgyak",
        fieldName: "subjects",
        minWidth: 30,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true
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

    this._allItems = [];
    this.props.topics.forEach((topic) =>
      this._allItems.push({
        key: topic.id,
        title: topic.title,
        semester:
          topic.schoolSemester === null
            ? "tetszőleges"
            : convertSchoolSemesterToString(topic.schoolSemester),
        technologies: topic.connectedTechnologyIds.join(", "),
        subjects: topic.connectedSubjectIds.join(", "),
        places: topic.numberOfPlaces,
        view: (
          <Link to={{ pathname: "/publishedThesis/editTopic/" + `${topic.id}` }}>
            <IconButton iconProps={{ iconName: "Edit" }} title="Szerkeszt" ariaLabel="Szerkeszt" />
          </Link>
        ),
        delete: (
          <ConfirmDelete
            type="topic"
            id={topic.id}
            name={topic.title}
            onDelete={this.onDelete}
          ></ConfirmDelete>
        )
      })
    );

    this.state = {
      items: this._allItems,
      columns: this._columns,
      isFilter: false,
      selectionDetails: this._getSelectionDetails()
    };
  }

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

  public onDelete(id: string, toggleHideDialog: Function) {
    // csak akkor ha nincsen rá jelentkezés!!! - régebbit törölhessen? a diáktól is eltűnik
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== id),
      isFilter: this.state.isFilter
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
  }

  // SEGÉDFGV
  private getDeleteIds(): string[] {
    //console.log(this._selection.getSelectedIndices());
    //ebből megkapom az indexeket a táblázatbeli helyüket, az alapján majd a key-t s tudom törölni
    let tableIndexes = this._selection.getSelectedIndices();
    let ids: string[] = [];
    for (let e in tableIndexes) {
      ids.push(this.state.items[e].key);
    }
    return ids;
  }

  // összes kijelölt törlése
  private onDeleteAll(toggleHideDialog: Function) {
    // akkor is törölheti ha van rá jelentkezés?
    // adatbből is törölni kell!
    toggleHideDialog();
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => !this.getDeleteIds().includes(item.key))
    });
    this._allItems = this._allItems.filter((item) => !this.getDeleteIds().includes(item.key));
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

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "";
      default:
        return `${selectionCount} elem kiválasztva`;
    }
  }

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
      <Fabric>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm9">
              <TextField
                className={textFieldStyle}
                label="Cím szerinti szűrés:"
                onChange={this._onFilter}
                styles={textFieldStyles}
              />
            </div>
            <div className="ms-Grid-col ms-sm3">
              <ConfirmDeleteAll
                count={this._selection.getSelectedCount()}
                onDelete={this.onDeleteAll}
              />
            </div>
          </div>
        </div>
        <div style={{ height: "200px", position: "relative" }}>
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <DetailsList
              items={items}
              columns={this._columns}
              layoutMode={DetailsListLayoutMode.justified}
              setKey="set"
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onRenderDetailsHeader={this.onRenderDetailsHeader}
            />
            {!this.state.items.length && !this.state.isFilter && (
              <Stack horizontalAlign="center">
                <Text>Nincsenek jelenleg meghirdetett témák!</Text>
              </Stack>
            )}
            {!this.state.items.length && this.state.isFilter && (
              <Stack horizontalAlign="center">
                <Text>Nincs a keresésnek megfelelő téma!</Text>
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

export default ValidTeacherTopics;
