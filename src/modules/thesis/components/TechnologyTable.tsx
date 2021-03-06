import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";
import DialogToEditTechnology from "./DialogToEditTechnology";
import AddNewTechnology from "./AddNewTechnology";
import { MessageBar, MessageBarType, SelectionMode, Separator } from "@fluentui/react";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";
import { exampleTechnologies } from "../exampleData";
import ConfirmActivity, { MyDialogType } from "./ConfirmActivity";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "200px" } };

// MEGERŐSÍTŐ ÜZENETEK
const SuccessonDeleteMessage = () => (
  <div style={{ height: "30px", marginTop: "10px", marginBottom: "10px" }}>
    <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
      Törölve lett egy technológia!
    </MessageBar>
  </div>
);

const SuccessonNewMessage = () => (
  <div style={{ height: "30px", marginTop: "10px", marginBottom: "10px" }}>
    <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
      Új technológia lett hozzáadva!
    </MessageBar>
  </div>
);

export interface IDetailsListBasicExampleItem {
  key: string;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  isFilter: boolean;
  deleteTechnology: boolean;
  newTechnology: boolean;
}

class TechnologyTable extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

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
    this.addNewTechnology = this.addNewTechnology.bind(this);

    this._allItems = [];
    exampleTechnologies.forEach((t) =>
      this._allItems.push({
        key: t.id,
        name: t.name,
        edit: <DialogToEditTechnology name={t.name} myId={t.id} onSave={this.onChangeName} />,
        delete: (
          <ConfirmActivity
            type={MyDialogType.DELETE_TECHNOLOGY}
            onPositive={this.onDelete}
            id={t.id}
            name={t.name}
            notEmpty={true}
            count={0}
            updateTextField={() => {}}
          />
        )
      })
    );
    this._allItems = this._allItems.sort((a, b) => (a.name > b.name ? 1 : -1));

    this.state = {
      items: this._allItems,
      isFilter: false,
      deleteTechnology: false,
      newTechnology: false
    };
  }

  public onRenderDetailsHeader(props: any, defaultRender: any) {
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

  public onChangeName(name: string, id: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.map((item) => (item.key === id ? { ...item, name } : item)),
      isFilter: this.state.isFilter
    });
  }

  public onDelete(id: string, toggleHideDialog: Function, updateTextField: Function) {
    toggleHideDialog();
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.key !== id),
      deleteTechnology: true
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
    setTimeout(() => this.setState({ ...this.state, deleteTechnology: false }), 4000);
  }

  public addNewTechnology(name: string, toogleHideDialog: Function, updateTextField: Function) {
    toogleHideDialog();
    updateTextField();
    let newItem: IDetailsListBasicExampleItem = {
      key: name,
      name: name,
      edit: (
        <DialogToEditTechnology
          name={name}
          myId={name}
          onSave={this.onChangeName}
        ></DialogToEditTechnology>
      ),
      delete: (
        <ConfirmActivity
          type={MyDialogType.DELETE_TECHNOLOGY}
          onPositive={this.onDelete}
          id={name}
          name={name}
          count={0}
          notEmpty={true}
          updateTextField={() => {}}
        ></ConfirmActivity>
      )
    };
    this.setState({
      ...this.state,
      items: [...this.state.items, newItem],
      newTechnology: true
    });
    setTimeout(() => this.setState({ ...this.state, newTechnology: false }), 4000);
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

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <>
        <AddNewTechnology
          onAddNew={this.addNewTechnology}
          technologies={this.state.items}
          name=""
        />
        <Separator></Separator>
        <h3>Adatbázisban levő technológiák</h3>
        <TextField
          className={exampleChildClass}
          label="Cím szerinti szűrés:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        {this.state.newTechnology ? <SuccessonNewMessage /> : null}
        {this.state.deleteTechnology ? <SuccessonDeleteMessage /> : null}
        <div style={{ height: "350px", position: "relative" }}>
          <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
            <DetailsList
              items={items}
              columns={this._columns}
              setKey="set"
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              constrainMode={ConstrainMode.unconstrained}
              onRenderDetailsHeader={this.onRenderDetailsHeader}
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
          </ScrollablePane>
        </div>
        <br />
        <br />
      </>
    );
  }
}

export default TechnologyTable;
