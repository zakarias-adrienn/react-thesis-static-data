import React, { ComponentProps } from "react";

import SearchByTitle from "../modules/thesis/components/SearchByTitle";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/SearchByTitleStory",
  component: SearchByTitle
};

export const First = () => <SearchByTitle />;
