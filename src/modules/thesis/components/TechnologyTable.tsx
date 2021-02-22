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
import { Stack } from "office-ui-fabric-react";
import ConfirmDelete from "./ConfirmDelete";
import DialogToEditTechnology from "./DialogToEditTechnology";
import AddNewTechnology from "./AddNewTechnology";
import { SelectionMode } from "@fluentui/react";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "200px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  name: string;
  edit: JSX.Element;
  delete: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  isFilter: boolean;
}

class TechnologyTable extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  componentDidMount() {
    // async - await adatbhívás -> eredménye technologies[] -> id, name
    /*

    _allItems = technologies.map(item => {
        key: item.name,
        name: item.name,
        edit: (
          <DialogToEditTechnology
            name=item.name
            myId=item.id
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={item.name}></ConfirmDelete>
        )
      });

      console.log(_allItems);
    */
  }

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

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push(
      {
        key: "JAVA",
        name: "JAVA",
        edit: (
          <DialogToEditTechnology
            name="JAVA"
            myId="JAVA"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"JAVA"}></ConfirmDelete>
        )
      },
      {
        key: "C++",
        name: "C++",
        edit: (
          <DialogToEditTechnology
            name="C++"
            myId="C++"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"C++"}></ConfirmDelete>
        )
      },
      {
        key: "HTML5",
        name: "HTML5",
        edit: (
          <DialogToEditTechnology
            name="HTML5"
            myId="JAVA"
            onSave={this.onChangeName}
          ></DialogToEditTechnology>
        ),
        delete: (
          <ConfirmDelete text="technology" onDelete={this.onDelete} which={"HTML5"}></ConfirmDelete>
        )
      }
    );

    this.state = {
      items: this._allItems,
      isFilter: false
    };
  }

  public onChangeName(name: string, id: string, toggleHideDialog: Function) {
    // console.log(name);
    // console.log(id);
    // console.log(this.state);
    toggleHideDialog();
    this.setState({
      items: this.state.items.map((item) => (item.key === id ? { ...item, name } : item)),
      isFilter: this.state.isFilter
    });
  }

  public onDelete(id: string, toggleHideDialog: Function) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== id),
      isFilter: this.state.isFilter
    });
    this._allItems = this._allItems.filter((item) => item.key !== id);
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
        <ConfirmDelete text="technology" onDelete={this.onDelete} which={name}></ConfirmDelete>
      )
    };
    // adatbázishívás -> ha nem sikerül mert már van ilyen nevű, akkor hibaüzenet!!
    this.setState({
      ...this.state,
      items: [...this.state.items, newItem]
    });
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <>
        <AddNewTechnology onAddNew={this.addNewTechnology} name="" />
        <h3>Adatbázisban levő technológiák</h3>
        <Fabric>
          <TextField
            className={exampleChildClass}
            label="Cím szerinti szűrés:"
            onChange={this._onFilter}
            styles={textFieldStyles}
          />
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="none"
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            // onItemInvoked={this._onItemInvoked}
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
        </Fabric>
      </>
    );
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
}

export default TechnologyTable;
