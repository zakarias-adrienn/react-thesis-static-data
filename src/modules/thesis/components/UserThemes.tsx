import * as React from "react";
import { Announced } from "office-ui-fabric-react/lib/Announced";
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
import { Icon } from "@fluentui/react";
import { SelectionMode } from "@fluentui/react";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

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
  isFilter: boolean;
}

const classNames = mergeStyleSets({
  plainCard: {
    width: 200,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px"
  },
  target: {
    display: "inline-block"
  }
});

class UserThemes extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];
  private hoverCard: any;

  instantDismissCard = (): void => {
    if (this.hoverCard.current) {
      this.hoverCard.current.dismiss();
    }
  };

  // valahogy adhatok paramétert hogy mit jelenítsen meg???
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

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      teacher: "Visnovitz Márton",
      semester: "2020/21-ősz",
      status: "Elfogadva",
      remove: <ConfirmWithdraw myId="Youniversity" onWithdraw={this.onDelete}></ConfirmWithdraw>
    });
    this._allItems.push({
      key: "TDK Dolgozat",
      title: "TDK Dolgozat",
      teacher: "Pusztai Kinga",
      semester: "2020/21-tavasz",
      status: (
        <HoverCard
          cardDismissDelay={300}
          type={HoverCardType.plain}
          plainCardProps={{ onRenderPlainCard: () => this.onRenderPlainCard("") }} //itt kell megadnom az indoklást
          componentRef={this.hoverCard}
          onCardHide={this.onCardHide}
        >
          <>
            Elutasítva
            <Icon className={classNames.target} iconName="StatusCircleQuestionMark"></Icon>
          </>
        </HoverCard>
      ),
      remove: <ConfirmWithdraw myId="TDK Dolgozat" onWithdraw={this.onDelete}></ConfirmWithdraw>
    });

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: "column2",
        name: "Témavezető",
        fieldName: "teacher",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column3",
        name: "Félév",
        fieldName: "semester",
        minWidth: 80,
        maxWidth: 100,
        isResizable: true
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

  public render(): JSX.Element {
    const { items } = this.state;

    return (
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
          layoutMode={DetailsListLayoutMode.justified}
          setKey="none"
          selectionMode={SelectionMode.none}
        />
        {!this.state.items.length && !this.state.isFilter && (
          <Stack horizontalAlign="center">
            <Text>Nem történt még egy témára sem jelentkezés!</Text>
          </Stack>
        )}
        {!this.state.items.length && this.state.isFilter && (
          <Stack horizontalAlign="center">
            <Text>Nincs a keresésnek megfelelő jelentkezés!</Text>
          </Stack>
        )}
      </Fabric>
    );
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
}

export default UserThemes;

// TODO: ha elutasítva, hogy jelenjen meg az indoklás?
