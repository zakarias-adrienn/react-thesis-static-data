import React from "react";

import SearchResult from "../modules/thesis/components/SearchResult";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";

export default {
  title: "SearchPage/SearchResultStory",
  component: SearchResult,
  decorators: [
    (SearchResult: any) => (
      <MemoryRouter>
        <SearchResult />
      </MemoryRouter>
    )
  ]
};

export const First = () => <SearchResult />;
