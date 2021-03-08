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
    this._allItems.push({
      key: "Garbage Collector működése Javában",
      title: "Garbage Collector működése Javában",
      name: "Zakariás Adrienn",
      semester: "2020-21-ősz",
      accept: (
        <ConfirmAccept
          name="Zakariás Adrienn"
          myId="Garbage Collector működése Javában"
          onAccept={this.handleAccept}
        ></ConfirmAccept>
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
      accept: (
        <ConfirmAccept
          name="Zöld Elek"
          myId="Youniversity"
          onAccept={this.handleAccept}
        ></ConfirmAccept>
      ),
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

  // FÜGGVÉNYEK
  // táblázat headerje görgetéskor fix legyen
  onRenderDetailsHeader(props: any, defaultRender: any) {
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
    this._allItems = this._allItems.filter((item) => item.key !== key);
    // a key-t kell majd csak átadnom, az alapján lekéri majd a komponens
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

  // Függőben levő jelentkezések kiszűrése
  private _getPendingApplications(applications: Application[]): Application[] {
    return applications.filter((appli) => appli.status === ApplicationStatus.Pending);
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <div className="ms-Grid" dir="ltr">
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

export default AppliedStudents;
