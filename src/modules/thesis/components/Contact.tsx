// EZ A KOMPONENS NINCS A FELÜLETEN HASZNÁLVA

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
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { ScrollablePane, ScrollbarVisibility, SelectionMode } from "@fluentui/react";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "180px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  name: string;
  email: string;
  website: JSX.Element;
  // esetleg még szoba?
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

class Contact extends React.Component<{}, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._allItems = [];
    this._allItems.push({
      key: "Visnovitz Márton",
      name: "Visnovitz Márton",
      email: "vimtaai@inf.elte.hu",
      website: (
        <a href="https://github.com/vimtaai/elte" target="_blank">
          https://github.com/vimtaai/elte
        </a>
      )
    });
    this._allItems.push({
      key: "Bernát Péter",
      name: "Bernát Péter",
      email: "bernatp@inf.elte.hu",
      website: (
        <a href="https://www.bernatp.hu/" target="_blank">
          https://www.bernatp.hu/
        </a>
      )
    });
    this._allItems = this._allItems.sort((a, b) => (a.name > b.name ? 1 : -1));

    this._columns = [
      {
        key: "column1",
        name: "Oktató neve",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true
      },
      {
        key: "column2",
        name: "E-mail cím",
        fieldName: "email",
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        isMultiline: true
      },
      {
        key: "column3",
        name: "Weboldal",
        fieldName: "website",
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

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
        : this._allItems,
      isFilter: text ? true : false
    });
  };

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <Fabric style={{ marginTop: "10px" }}>
        <TextField
          className={exampleChildClass}
          label="Név szerinti szűrés:"
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
                <Text>Nincs még egyetlen adat sem!</Text>
              </Stack>
            )}
            {!this.state.items.length && this.state.isFilter && (
              <Stack>
                <Text>Nincs a keresésnek megfelelő elérhetőség!</Text>
              </Stack>
            )}
          </ScrollablePane>
        </div>
      </Fabric>
    );
  }
}

export default Contact;
