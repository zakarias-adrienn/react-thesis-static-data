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
import { DefaultButton, PrimaryButton, Stack } from "office-ui-fabric-react";
import AcceptedStudents from "./AcceptedStudents";
import { Text } from "office-ui-fabric-react/lib/Text";
import ConfirmDeny from "./ConfirmDeny";

// STYLES
const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "180px" } };

// TYPES
export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  name: string;
  semester: string;
  accept: JSX.Element;
  deny: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  isFilter: boolean;
}

class AppliedStudents extends React.Component<{}, IDetailsListBasicExampleState> {
  // FIELDS
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  private acceptedStudents: any;

  constructor(props: {}) {
    super(props);

    this.onDeny = this.onDeny.bind(this);
    this.handleAccept = this.handleAccept.bind(this);

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Garbage Collector működése Javában",
      title: "Garbage Collector működése Javában",
      name: "Zakariás Adrienn",
      semester: "2020-21-ősz",
      accept: (
        <PrimaryButton
          text="Elfogad"
          onClick={() => this.handleAccept("Garbage Collector működése Javában")}
        />
      ),
      deny: (
        <ConfirmDeny
          name="Zakariás Adrienn"
          myId="Garbage Collector működése Javában"
          onDeny={this.onDeny}
        ></ConfirmDeny>
      )
    });
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      name: "Zöld Elek",
      semester: "2020-21-ősz",
      accept: <PrimaryButton text="Elfogad" onClick={() => this.handleAccept("Youniversity")} />,
      deny: <ConfirmDeny name="Zöld Elek" myId="Youniversity" onDeny={this.onDeny}></ConfirmDeny>
    });

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 200,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column2",
        name: "Hallgató",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
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
      isFilter: false
    };
  }

  // FUNCTIONS

  onDeny(myId: string, toggleHideDialog: any) {
    toggleHideDialog();
    this.setState({
      items: this.state.items.filter((item) => item.key !== myId)
    });
    this._allItems = this._allItems.filter((item) => item.key !== myId);
  }

  handleAccept(key: string) {
    console.log(key);
    this.setState({
      items: this.state.items.filter((item) => item.key !== key)
    });
    let title: string = this._allItems.filter((item) => item.key === key)[0].title;
    let student: string = this._allItems.filter((item) => item.key === key)[0].name;
    this._allItems = this._allItems.filter((item) => item.key !== key);
    this.acceptedStudents.updateState(key, title, student);
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

  // KÖZÉPRE TEVÉS
  // private renderDetailsHeader(detailsHeaderProps: IDetailsHeaderProps) {
  //   return (
  //     <DetailsHeader
  //       {...detailsHeaderProps}
  //       onRenderColumnHeaderTooltip={this.renderCustomHeaderTooltip}
  //     />
  //   );
  // }

  // private renderRow: IDetailsListProps["onRenderRow"] = (props) => {
  //   const customStyles: Partial<IDetailsRowStyles> = {};
  //   if (props) {
  //     customStyles.root = { textAlign: "center" };

  //     return <DetailsRow {...props} styles={customStyles} />;
  //   }
  //   return null;
  // };

  // // így tudom stylingolni a headereket
  // private renderCustomHeaderTooltip(tooltipHostProps: ITooltipHostProps) {
  //   return (
  //     <span
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         fontSize: "12px"
  //       }}
  //     >
  //       {tooltipHostProps.children}
  //     </span>
  //   );
  // }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div className="ms-Grid" dir="ltr">
        <h3>Függőben levő jelentkezések</h3>
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
          />
          {!this.state.items.length && !this.state.isFilter && (
            <Stack>
              <Text>
                Jelenleg nincsen függőben levő jelentkezés egyetlen meghirdetett saját témára sem!
              </Text>
            </Stack>
          )}
          {!this.state.items.length && this.state.isFilter && (
            <Stack>
              <Text>Nincs a keresésnek megfelelő jelentkezés!</Text>
            </Stack>
          )}
        </Fabric>
        <br />
        <br />
        <AcceptedStudents ref={(ele) => (this.acceptedStudents = ele)}></AcceptedStudents>
        <br />
      </div>
    );
  }
}

export default AppliedStudents;
