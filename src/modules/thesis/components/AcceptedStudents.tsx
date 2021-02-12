import * as React from "react";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  semester: string;
  name: string;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  isFilter: boolean;
}

class AcceptedStudents extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.updateState = this.updateState.bind(this);

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Régi projekt 1",
      title: "Régi projekt 1",
      name: "Zakariás Adrienn",
      semester: "2020/21-tavasz"
    });
    this._allItems.push({
      key: "Régi projekt 2",
      title: "Régi projekt 2",
      name: "Zöld Elek",
      semester: "2019/20-ősz"
    });

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 200,
        maxWidth: 400,
        isResizable: true
      },
      {
        key: "column2",
        name: "Hallgató",
        fieldName: "name",
        minWidth: 200,
        maxWidth: 250,
        isResizable: true
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      isFilter: false
    };
  }

  public updateState(key: string, title: string, name: string) {
    let acceptedItem: IDetailsListBasicExampleItem = {
      key: key,
      title: title,
      name: name,
      semester: "2020/21-ősz" // TODO: aktuális félévet kellene
    };
    this.setState({
      items: [...this.state.items, acceptedItem]
    });
    this._allItems.push(acceptedItem);
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <>
        <h3>Elfogadott jelentkezések</h3>
        <Fabric>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm4">
                <TextField
                  className={exampleChildClass}
                  label="Cím szerinti szűrés:"
                  onChange={this._onFilter}
                  styles={textFieldStyles}
                />
              </div>
              <div className="ms-Grid-col ms-sm8">
                <TextField
                  className={exampleChildClass}
                  label="Hallgató szerinti szűrés:"
                  onChange={this._onFilter2}
                  styles={textFieldStyles}
                />
              </div>
            </div>
          </div>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="none"
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
          />
          {!this.state.items.length && !this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>
                Jelenleg nincsen függőben levő jelentkezés egyetlen meghirdetett saját témára sem!
              </Text>
            </Stack>
          )}
          {!this.state.items.length && this.state.isFilter && (
            <Stack horizontalAlign="center">
              <Text>Nincs a keresésnek megfelelő jelentkezés!</Text>
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
    console.log(this.state.items);
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.title.toLowerCase().indexOf(text?.toLowerCase()) > -1)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  private _onFilter2 = (
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
}

export default AcceptedStudents;
