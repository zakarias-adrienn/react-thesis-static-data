import * as React from "react";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";

// saját importok
import { Application, ApplicationStatus } from "../model/application.model";

// MEZŐK STÍLUSAI
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "200px", float: "left", paddingRight: "20px", paddingLeft: "0px" }
};

// LISTA ELEMEK TÍPUSA
export interface DetailsListItemType {
  key: string;
  title: string;
  semester: string;
  name: string;
}

// TÁBLÁZAT ÁLLAPOTÁNAK TÍPUSA
export interface DetailsListStateType {
  items: DetailsListItemType[];
  isFilter: boolean;
}

class AcceptedStudents extends React.Component<{}, DetailsListStateType> {
  // MEZŐK
  private _allItems: DetailsListItemType[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    // BINDOLT METÓDUSOK
    this.updateState = this.updateState.bind(this);

    // EZEK MAJD AZ ADATBÁZISBÓL JÖNNEK - Application[] -> ebből kell a topicId alaján a Topic -> studentId alapján kell a Student neve
    // Application[]-ből még ki kell szűrni a status alapján azokat, amik ACCEPTED-ek
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

    // OSZLOPOK TÍPUSA
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
      }
    ];

    // ÁLLAPOT BEÁLLÍTÁSA
    this.state = {
      items: this._allItems,
      isFilter: false
    };
  }

  // FÜGGVÉNYEK
  // fixen maradó header görgetéskor
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

  // ha a felső táblázatban elfogad valakit, akkor átkerül a jelentkezése az alsó táblázatba
  // TODO: csak a key alapján lekérni a jelentkezést db-ből, státuszt átállítani, acceptedItem-et megkreálni
  public updateState(key: string, title: string, name: string) {
    let acceptedItem: DetailsListItemType = {
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

  // szűrések - nem csak kezdeti egyezés, hanem belső egyezéseket is vizsgál
  private _onFilterByTitle = (
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

  private _onFilterByStudentName = (
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

  // elfogadott jelentkezések kiszűrése - TODO: használni majd
  private _getAcceptedApplications(applications: Application[]): Application[] {
    return applications.filter((appli) => appli.status === ApplicationStatus.Accepted);
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <>
        <h3>Elfogadott jelentkezések</h3>
        <Fabric>
          <div className="ms-Grid" dir="ltr" style={{ overflow: "hidden" }}>
            <TextField
              label="Cím szerinti szűrés:"
              onChange={this._onFilterByTitle}
              styles={textFieldStyles}
            />
            <TextField
              label="Hallgató szerinti szűrés:"
              onChange={this._onFilterByStudentName}
              styles={textFieldStyles}
            />
          </div>
          <div style={{ height: "200px", position: "relative" }}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <DetailsList
                items={items}
                columns={this._columns}
                setKey="none"
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.justified}
                selectionPreservedOnEmptyClick={true}
                onRenderDetailsHeader={this.onRenderDetailsHeader}
              />
              {!this.state.items.length && !this.state.isFilter && (
                <Stack horizontalAlign="center">
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
      </>
    );
  }
}

export default AcceptedStudents;
