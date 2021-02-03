import * as React from "react";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import { TextField, ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";
import { Text } from "office-ui-fabric-react/lib/Text";
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from "office-ui-fabric-react";
import {
  DetailsHeader,
  IDetailsHeaderProps
} from "office-ui-fabric-react/lib/components/DetailsList/DetailsHeader";
import { ITooltipHostProps } from "office-ui-fabric-react/lib/Tooltip";
import {
  DetailsRow,
  IDetailsRowStyles,
  IDetailsListProps
} from "office-ui-fabric-react/lib/DetailsList";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px"
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  name: string;
  accept: any;
  deny: any;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}

class AppliedStudents extends React.Component<{}, IDetailsListBasicExampleState> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    //this.renderDetailsHeader = this.renderDetailsHeader.bind(this);

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
      key: "Garbage Collector működése Javában",
      title: "Garbage Collector működése Javában",
      name: "Zakariás Adrienn",
      accept: <DefaultButton text="Elfogad" />,
      deny: <PrimaryButton text="Elutasít" />
    });
    this._allItems.push({
      key: "Youniversity",
      title: "Youniversity",
      name: "Zöld Elek",
      accept: <DefaultButton text="Elfogad" />,
      deny: <PrimaryButton text="Elutasít" />
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
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column3",
        name: "Elfogadás",
        fieldName: "accept",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column4",
        name: "Elutasítás",
        fieldName: "deny",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails()
    };
  }

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
    const { items, selectionDetails } = this.state;

    return (
      <Fabric>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        <TextField
          className={exampleChildClass}
          label="Cím szerinti szűrés:"
          //onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked}
            // onRenderDetailsHeader={this.renderDetailsHeader}
            // onRenderRow={this.renderRow}
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "Nincs kiválasztva elem";
      case 1:
        return (
          "1 kiválasztott elem: " +
          (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).title
        );
      default:
        return `${selectionCount} darab elem kiválasztva`;
    }
  }

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter((i) => i.title.toLowerCase().indexOf(text) > -1)
        : this._allItems
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Kattintottak: ${item.title}`);
  };
}

export default AppliedStudents;
