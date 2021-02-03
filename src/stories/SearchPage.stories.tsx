import React, { ComponentProps } from "react";

import SearchPage from "../modules/thesis/components/SearchPage";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPageFull/SearchPageStory",
  component: SearchPage
};

export const First = () => <SearchPage />;
