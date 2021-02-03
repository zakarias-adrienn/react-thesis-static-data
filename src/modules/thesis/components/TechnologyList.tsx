import * as React from "react";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { List, ScrollToMode, IList } from "office-ui-fabric-react/lib/List";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { createListItems, IExampleItem } from "@uifabric/example-data";
import { mergeStyleSets, getTheme, normalize } from "office-ui-fabric-react/lib/Styling";
import { useConst } from "@uifabric/react-hooks";

const evenItemHeight = 25;
const oddItemHeight = 50;
const numberOfItemsOnPage = 10;
const theme = getTheme();
const dropdownOptions = [
  { key: "auto", text: "Auto" },
  { key: "top", text: "Top" },
  { key: "bottom", text: "Bottom" },
  { key: "center", text: "Center" }
];

const styles = mergeStyleSets({
  container: {
    overflow: "auto",
    maxHeight: 400,
    border: "1px solid #CCC",
    marginTop: 20,
    selectors: {
      ".ms-List-cell:nth-child(odd)": {
        height: 30,
        lineHeight: 30,
        background: theme.palette.neutralLighter
      },
      ".ms-List-cell:nth-child(even)": {
        height: 25,
        lineHeight: 25
      }
    }
  },
  itemContent: [
    theme.fonts.medium,
    normalize,
    {
      position: "relative",
      boxSizing: "border-box",
      display: "block",
      borderLeft: "3px solid " + theme.palette.themePrimary,
      paddingLeft: 27
    }
  ]
});

const onRenderCell = (item: MyListItem | undefined, index: number | undefined): JSX.Element => {
  return (
    <div data-is-focusable>
      <div className={styles.itemContent}>
        {index !== undefined ? index + 1 : undefined} &nbsp;{" "}
        {item !== undefined ? item.name : undefined}
      </div>
    </div>
  );
};

export interface MyListItem {
  key: string;
  name: string;
}

let allItems: MyListItem[] = [];
allItems.push(
  { key: "JAVA", name: "JAVA" },
  { key: "C++", name: "C++" },
  { key: "HTML5", name: "HTML5" },
  { key: "CSS", name: "CSS" },
  { key: "Javascript", name: "Javascript" },
  { key: "React", name: "React" }
);

const TechnologyList: React.FunctionComponent = () => {
  // const originalItems = useConst(() => createListItems(100));
  // const [items, setItems] = React.useState(originalItems);
  const originalItems = allItems;
  const [items, setItems] = React.useState(originalItems);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollToMode, setScrollToMode] = React.useState<ScrollToMode>(ScrollToMode.auto);
  const listRef: React.RefObject<IList> = React.useRef(null);

  const scroll = (index: number, propScrollToMode: ScrollToMode): void => {
    const updatedSelectedIndex = Math.min(Math.max(index, 0), items.length - 1);
    setSelectedIndex(updatedSelectedIndex);
    setScrollToMode(propScrollToMode);

    listRef.current?.scrollToIndex(
      updatedSelectedIndex,
      (idx) => (idx % 2 === 0 ? evenItemHeight : oddItemHeight),
      scrollToMode
    );
  };

  const getPageHeight = (idx: number | undefined): number => {
    let h = 0;
    if (idx !== undefined) {
      for (let i = idx; i < idx + numberOfItemsOnPage; ++i) {
        const isEvenRow = i % 2 === 0;

        h += isEvenRow ? evenItemHeight : oddItemHeight;
      }
    }
    return h;
  };

  const scrollRelative = (delta: number): (() => void) => {
    return (): void => {
      scroll(selectedIndex + delta, scrollToMode);
    };
  };

  const onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ): void => {
    scroll(parseInt(value, 10) || 0, scrollToMode);
  };

  const onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
    let scrollMode = scrollToMode;
    switch (option.key) {
      case "auto":
        scrollMode = ScrollToMode.auto;
        break;
      case "top":
        scrollMode = ScrollToMode.top;
        break;
      case "bottom":
        scrollMode = ScrollToMode.bottom;
        break;
      case "center":
        scrollMode = ScrollToMode.center;
        break;
    }
    scroll(selectedIndex, scrollMode);
  };

  const resultCountText =
    items.length === originalItems.length
      ? ""
      : ` (${items.length} / ${originalItems.length} találat)`;

  const onFilterChanged = (_: any, text: string | undefined): void => {
    setItems(
      originalItems.filter(
        (item) => item.name.toLowerCase().indexOf(text ? text.toLowerCase() : "") >= 0
      )
    );
  };

  return (
    <FocusZone direction={FocusZoneDirection.vertical}>
      <TextField
        label={"Szűrés név szerint" + resultCountText}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onFilterChanged}
      />
      <div className={styles.container} data-is-scrollable>
        <List
          componentRef={listRef}
          items={items}
          // eslint-disable-next-line react/jsx-no-bind
          getPageHeight={getPageHeight}
          onRenderCell={onRenderCell}
        />
      </div>
    </FocusZone>
  );
};

export default TechnologyList;
