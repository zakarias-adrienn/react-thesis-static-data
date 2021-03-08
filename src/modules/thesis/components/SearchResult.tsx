import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { IconButton } from "@fluentui/react/lib/Button";
import { MessageBar } from "office-ui-fabric-react";
import { SelectionMode, Stack } from "@fluentui/react";
import SeeTheme from "./SeeTopic";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";
import { Text } from "office-ui-fabric-react/lib/Text";

// saját importok
import { Topic } from "../model/topics.model";
import {
  convertLanguagesToString,
  convertSchoolSemesterToString,
  convertTypeToString
} from "../helperFunctions";

export interface IDetailsListBasicExampleItem {
  key: string;
  title: string;
  teacher: string;
  type: string;
  semester: string;
  language: string;
  technologies: string;
  subjects: string;
  places: number | string;
  view: JSX.Element;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  seeTheme: boolean;
  seeTopicId: string;
}

type Prop = {
  hideHeaderSearch: Function;
  topicsToShow: Topic[];
};

class SearchResult extends React.Component<Prop, IDetailsListBasicExampleState> {
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: Prop) {
    super(props);

    this.setSeeTheme = this.setSeeTheme.bind(this);
    this.onBackToSearch = this.onBackToSearch.bind(this);

    this._allItems = [];
    this.props.topicsToShow.forEach((topic) =>
      this._allItems.push({
        key: topic.id,
        title: topic.title,
        teacher: topic.teacherId,
        type: convertTypeToString(topic.type),
        semester:
          topic.schoolSemester === null
            ? "tetszőleges"
            : convertSchoolSemesterToString(topic.schoolSemester),
        language: convertLanguagesToString(topic.language),
        technologies: topic.connectedTechnologyIds.join(", "), //itt majd nem id-kat kell kiírni, hanem neveket
        subjects: topic.connectedSubjectIds.join(", "),
        places: topic.numberOfPlaces,
        view: (
          <IconButton
            iconProps={{ iconName: "RedEye" }}
            title="Megtekint"
            ariaLabel="Megtekint"
            onClick={() => this.setSeeTheme(topic.id)}
          />
        )
      })
    );
    this._allItems = this._allItems.sort((a, b) => (a.title > b.title ? 1 : -1));

    this._columns = [
      {
        key: "column1",
        name: "Cím",
        fieldName: "title",
        minWidth: 20,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column2",
        name: "Tanár",
        fieldName: "teacher",
        minWidth: 20,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column3",
        name: "Jelleg",
        fieldName: "type",
        minWidth: 20,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column4",
        name: "Félév",
        fieldName: "semester",
        minWidth: 10,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column5",
        name: "Nyelv",
        fieldName: "language",
        minWidth: 30,
        maxWidth: 90,
        isResizable: true
      },
      {
        key: "column6",
        name: "Technológiák",
        fieldName: "technologies",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column7",
        name: "Tantárgyak",
        fieldName: "subjects",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      },
      {
        key: "column8",
        name: "Helyszám",
        fieldName: "places",
        minWidth: 10,
        maxWidth: 70,
        isResizable: true
      },
      {
        key: "column9",
        name: "Megtekintés",
        fieldName: "view",
        minWidth: 30,
        maxWidth: 100,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      seeTheme: false,
      seeTopicId: ""
    };
  }

  private onRenderDetailsHeader(props: any, defaultRender: any) {
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

  private setSeeTheme(id: string) {
    this.props.hideHeaderSearch();
    this.setState({
      ...this.state,
      seeTheme: true,
      seeTopicId: id
    });
  }

  private onBackToSearch() {
    this.props.hideHeaderSearch();
    this.setState({
      ...this.state,
      seeTheme: false,
      seeTopicId: ""
    });
  }

  public render(): JSX.Element {
    const { items } = this.state;

    return (
      <Fabric>
        {!this.state.seeTheme ? (
          <>
            <MessageBar>Jelentkezni a téma részleteinek megtekintése során lehet.</MessageBar>
            <div style={{ height: "500px", position: "relative" }}>
              <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                <DetailsList
                  //az items inkább propsban jön majd
                  items={items}
                  columns={this._columns}
                  layoutMode={DetailsListLayoutMode.justified}
                  setKey="none"
                  selectionMode={SelectionMode.none}
                  onRenderDetailsHeader={this.onRenderDetailsHeader}
                />
                {!this.state.items.length && (
                  <Stack>
                    <Text>Nincs a keresésnek megfelelő találat!</Text>
                  </Stack>
                )}
              </ScrollablePane>
            </div>
          </>
        ) : (
          <SeeTheme onBack={this.onBackToSearch} id={this.state.seeTopicId}></SeeTheme>
        )}
      </Fabric>
    );
  }
}

export default SearchResult;
