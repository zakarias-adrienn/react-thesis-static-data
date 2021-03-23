import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  IconButton,
  IStackTokens,
  ITextFieldStyles,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  ScrollablePane,
  ScrollbarVisibility
} from "@fluentui/react";
import { SelectionMode } from "@fluentui/react";
import { Practice } from "../model/practice.model";
import SeePractice from "./SeePractice";
import { convertLanguagesToString } from "../helperFunctions";
import MySpinner from "./MySpinner";
import { rootPath } from "../path";
import { isAdmin } from "../roles";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { examplePractices, examplePractices as practices, exampleTopics } from "../exampleData";
import { exampleTechnologies } from "../exampleData";

const technologies: string[] = exampleTechnologies.map((t) => t.name);

let technologyOptions: IComboBoxOption[] = [];
technologies.forEach((name) => technologyOptions.push({ key: name, text: name }));
technologyOptions = technologyOptions.sort((t1, t2) => (t1.key < t2.key ? -1 : 1));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// MEGERŐSÍTŐ ÜZENETEK
const SuccessonDeleteMessage = () => (
  <div style={{ height: "30px", marginTop: "10px", marginBottom: "10px" }}>
    <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
      Törölve lett egy szakmai gyakorlati hely!
    </MessageBar>
  </div>
);

const comboboxStyles: Partial<IComboBoxStyles> = {
  root: { width: 400 },
  optionsContainerWrapper: {
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "300px",
    width: 400
  }
};

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "200px" } };

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

export interface IDetailsListBasicExampleItem {
  key: string;
  company: string;
  contact: string;
  connectedTechnologyIds: string;
  place: string;
  language: string;
  view: JSX.Element;
  edit: JSX.Element;
  delete: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  isFilter: boolean;
  columns: IColumn[];
  seePractice: boolean;
  seePracticeId: string;
  selectedTechnologyIds: string[];
  searchResult: Practice[];
  searchIsDone: boolean;
  isSearchProgress: boolean;
  deletePractise: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 20 };

class Practices extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: any) {
    super(props);

    this.onBackToSearch = this.onBackToSearch.bind(this);
    this.setSeePractice = this.setSeePractice.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);

    // TOPICHOZ MEGFELELŐ TECHNOLÓGIANEVEK - TODO: lekérni
    let technologyNamesToPractice = new Map<String, String[]>();
    examplePractices.forEach((t) => {
      let technologiesHere = exampleTechnologies.filter((tech) =>
        t.connectedTechnologyIds.includes(tech.id)
      );
      let technologyNames = technologiesHere.map((tech) => tech.name);
      technologyNames = technologyNames.sort(function (a, b) {
        return a.localeCompare(b);
      });
      technologyNamesToPractice.set(t.id, technologyNames);
    });

    this._allItems = [];
    practices.forEach((p) => {
      this._allItems.push({
        key: p.id,
        company: p.company,
        contact: p.contact,
        connectedTechnologyIds: technologyNamesToPractice.get(p.id)?.join(", ") || "",
        place: p.place,
        language: convertLanguagesToString(p.language),
        view: (
          <IconButton
            iconProps={{ iconName: "RedEye" }}
            title="Megtekint"
            ariaLabel="Megtekint"
            onClick={() => this.setSeePractice(p.id)}
          />
        ),
        edit: (
          <Link to={{ pathname: rootPath + "/practices/editPractice/" + `${p.id}` }}>
            <IconButton iconProps={{ iconName: "Edit" }} title="Szerkeszt" ariaLabel="Szerkeszt" />
          </Link>
        ),
        delete: (
          <ConfirmDelete type={"practice"} id={p.id} name={p.company} onDelete={this.onDelete} />
        )
      });
    });
    this._allItems = this._allItems.sort((a, b) => (a.company > b.company ? 1 : -1));

    this._columns = [
      {
        key: "column1",
        name: "Cég",
        fieldName: "company",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true,
        onColumnClick: this._onColumnClick
      },
      {
        key: "column2",
        name: "Elérhetőség",
        fieldName: "contact",
        minWidth: 80,
        maxWidth: 180,
        isResizable: true,
        isMultiline: true
      },
      {
        key: "column3",
        name: "Technológiák",
        fieldName: "connectedTechnologyIds",
        minWidth: 120,
        maxWidth: 150,
        isResizable: true
      },
      {
        key: "column4",
        name: "Helyszín",
        fieldName: "place",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column5",
        name: "Nyelv",
        fieldName: "language",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column6",
        name: "Megtekintés",
        fieldName: "view",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      }
    ];
    if (isAdmin) {
      this._columns.push({
        key: "column7",
        name: "Szerkesztés",
        fieldName: "edit",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      });
      this._columns.push({
        key: "column8",
        name: "Törlés",
        fieldName: "delete",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      });
    }

    this.state = {
      items: this._allItems,
      isFilter: false,
      columns: this._columns,
      seePractice: false,
      seePracticeId: "",
      selectedTechnologyIds: [],
      searchResult: [],
      searchIsDone: false,
      isSearchProgress: false,
      deletePractise: false
    };
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

  public onDelete(id: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      ...this.state,
      deletePractise: true,
      items: this.state.items.filter((item) => item.key !== id)
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
    setTimeout(() => this.setState({ ...this.state, deletePractise: false }), 4000);
  }

  private onChange(
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption | undefined,
    index?: number | undefined,
    value?: string | undefined
  ) {
    {
      if (this.state.selectedTechnologyIds.includes(option?.key.toString() || "")) {
        let keys = this.state.selectedTechnologyIds.filter(
          (key) => key !== option?.key.toString() || ""
        );
        this.setState({ ...this.state, selectedTechnologyIds: keys });
      } else {
        this.setState({
          ...this.state,
          selectedTechnologyIds: [...this.state.selectedTechnologyIds, option?.key.toString() || ""]
        });
      }
    }
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.company.toLowerCase().indexOf(text.toLowerCase()) === 0)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  private setSeePractice(id: string) {
    this.setState({
      ...this.state,
      seePractice: true,
      seePracticeId: id
    });
  }

  private onBackToSearch() {
    this.setState({
      ...this.state,
      seePractice: false,
      seePracticeId: ""
    });
  }

  private handleSearch() {
    this.setState({ ...this.state, searchIsDone: false, isSearchProgress: true });
    setTimeout(
      () =>
        this.setState({
          ...this.state,
          searchIsDone: true,
          isSearchProgress: false,
          items:
            this.state.selectedTechnologyIds.length > 0
              ? this._allItems.filter(
                  (item) =>
                    item.connectedTechnologyIds
                      .split(",")
                      .flat(1)
                      .map((i) => i.trim())
                      .filter((t) => this.state.selectedTechnologyIds.includes(t)).length > 0
                )
              : this._allItems
        }),
      2000
    );
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <Fabric style={{ marginTop: "10px" }}>
        {!this.state.seePractice ? (
          <>
            <Stack tokens={stackTokens}>
              <ComboBox
                label="Szakmai gyakorlati helyhez kapcsolódó technológiák"
                placeholder="Válassz(on) technológiákat..."
                multiSelect
                allowFreeform
                autoComplete="on"
                options={technologyOptions}
                styles={comboboxStyles}
                selectedKey={this.state.selectedTechnologyIds}
                onChange={this.onChange}
              />
            </Stack>
            <br />
            <PrimaryButton onClick={() => this.handleSearch()}>Keresés</PrimaryButton>
            <br />
            <br />
            {this.state.isSearchProgress && (
              <MySpinner label="Folyamatban a keresés..."></MySpinner>
            )}
            {this.state.deletePractise ? <SuccessonDeleteMessage /> : null}
            {this.state.searchIsDone && (
              <>
                <TextField
                  className={exampleChildClass}
                  label="Cég neve szerinti szűrés:"
                  onChange={this._onFilter}
                  styles={textFieldStyles}
                />
                <div style={{ height: "900px", position: "relative" }}>
                  <br />
                  <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                    <DetailsList
                      items={items}
                      columns={this._columns}
                      layoutMode={DetailsListLayoutMode.justified}
                      setKey="none"
                      selectionMode={SelectionMode.none}
                    />
                    {!this.state.items.length && (
                      <Stack>
                        <Text>Nincsen egyetlen gyakorlati hely sem jelenleg!</Text>
                      </Stack>
                    )}
                  </ScrollablePane>
                </div>
              </>
            )}
          </>
        ) : (
          <SeePractice
            onBack={this.onBackToSearch}
            practice={practices.filter((p) => p.id === this.state.seePracticeId)[0]}
          ></SeePractice>
        )}
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

export default Practices;
