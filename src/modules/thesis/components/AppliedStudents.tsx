import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { IconButton } from '@fluentui/react/lib/Button';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  name: string;
  accept: any,
  deny: any
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
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

    // Populate with items for demos.
    this._allItems = [];
    this._allItems.push({
        key: 'Garbage Collector működése Javában',
        title: 'Garbage Collector működése Javában',
        name: 'Zakariás Adrienn',
        accept: <IconButton iconProps={{ iconName: 'Accept' }} title="Elfogad" ariaLabel="Elfogad" />,
        deny:  <IconButton iconProps={{ iconName: 'Clear' }} title="Elutasít" ariaLabel="Elutasít" />,
    });
    this._allItems.push({
        key: 'Youniversity',
        title: 'Youniversity',
        name: 'Zöld Elek',
        accept: <DefaultButton style={{ backgroundColor: '#73DA2A' }} text="Elfogad" />,
        deny:  <DefaultButton style={{ backgroundColor: '#ff4d4d' }} text="Elutasít" />
    });

    this._columns = [
      { key: 'column1', name: 'Cím', fieldName: 'title', minWidth: 20, maxWidth: 100, isResizable: true },
      { key: 'column2', name: 'Hallgató', fieldName: 'name', minWidth: 10, maxWidth: 100, isResizable: true },
      { key: 'column3', name: 'Elfogadás', fieldName: 'accept', minWidth: 10, maxWidth: 100, isResizable: true },
      { key: 'column4', name: 'Elutasítás', fieldName: 'deny', minWidth: 10, maxWidth: 100, isResizable: true },
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails(),
    };
  }


  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <Fabric>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        <TextField
          className={exampleChildClass}
          label="Cím szerinti szűrés:"
          onChange={this._onFilter}
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
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'Nincs kiválasztva elem';
      case 1:
        return '1 kiválasztott elem: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).title;
      default:
        return `${selectionCount} darab elem kiválasztva`;
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.title.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Kattintottak: ${item.title}`);
  };
}

export default AppliedStudents;
