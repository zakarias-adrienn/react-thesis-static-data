import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { IconButton } from "@fluentui/react/lib/Button";
import { MessageBar } from "office-ui-fabric-react";
import { BrowserRouter, Link } from "react-router-dom";
import { SelectionMode, Stack } from "@fluentui/react";
import SeeTheme from "./SeeTheme";
import { ScrollablePane, ScrollbarVisibility } from "office-ui-fabric-react/lib/ScrollablePane";
import { Sticky, StickyPositionType } from "office-ui-fabric-react/lib/Sticky";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Topic, TopicType, Semester, Language, SchoolSemester } from "../model/topics.model";

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

const convertSchollSemesterToString = (s: SchoolSemester) => {
  // a null eset már meg lett vizsgálva
  var stringResult: string = "";
  stringResult += s.year;
  stringResult += "-";
  stringResult += s.half === Semester.Autumn ? "ősz" : "tavasz";
  return stringResult;
};

const convertLanguagesToString = (l: Language[]) => {
  var languages: string = "";
  l.forEach((language) =>
    language === Language.Hungarian
      ? languages.length > 0
        ? (languages += ", magyar")
        : (languages += "magyar")
      : languages.length > 0
      ? (languages += ", angol")
      : (languages += "angol")
  );
  return languages;
};

const convertTypeToString = (t: TopicType[]) => {
  var types: string = "";
  t.forEach((type) => {
    switch (type) {
      case TopicType.BScTDK:
        types.length > 0 ? (types += ", BSc-TDK") : (types += "BSc-TDK");
        break;
      case TopicType.BScThesis:
        types.length > 0 ? (types += ", BSc-szakdolgozat") : (types += "BSc-szakdolgozat");
        break;
      case TopicType.MScTDK:
        types.length > 0 ? (types += ", MSc-TDK") : (types += "MSc-TDK");
        break;
      case TopicType.MScThesis:
        types.length > 0 ? (types += ", MSc-szakdolgozat") : (types += "MSc-szakdolgozat");
        break;
      default:
        types.length > 0 ? (types += ", projekt") : (types += "projekt");
    }
  });
  return types;
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
            : convertSchollSemesterToString(topic.schoolSemester),
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

    // this._allItems.push({
    //   key: "Garbage Collector működése Javában",
    //   title: "Garbage Collector működése Javában",
    //   teacher: "Kozsik Tamás",
    //   type: "BSc szakdolgozati",
    //   semester: "2020/21-ősz",
    //   language: "magyar",
    //   technologies: "Java",
    //   subjects: "Programozási nyelvek - Java",
    //   places: "Betelt",
    //   view: (
    //     // így nem veszik el a keresés eredménye, de a keresés felül ott lesz
    //     <IconButton
    //       iconProps={{ iconName: "RedEye" }}
    //       title="Megtekint"
    //       ariaLabel="Megtekint"
    //       onClick={() => this.setSeeTheme("Garbage Collector műküdése Javában")}
    //     />
    //   )
    // });
    // this._allItems.push({
    //   key: "Youniversity",
    //   title: "Youniversity",
    //   teacher: "Visnovitz Márton",
    //   type: "BSc szakdolgozati",
    //   semester: "2020/21-tavasz",
    //   language: "magyar",
    //   technologies: "React, Javascript",
    //   subjects: "Webprogramozás, \nKliensoldali webprogramozás",
    //   places: 4,
    //   view: (
    //     // lehet így linkkel lekérni, de visszakor elveszik a keresés eredménye
    //     <IconButton
    //       iconProps={{ iconName: "RedEye" }}
    //       title="Megtekint"
    //       ariaLabel="Megtekint"
    //       onClick={() => this.setSeeTheme("Youniversity")}
    //     />
    //   )
    // });

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
