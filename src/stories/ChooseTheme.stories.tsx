import React, { ComponentProps } from "react";

import ChooseTheme from "../modules/thesis/components/ChooseTheme";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/ChooseThemeStory",
  component: ChooseTheme
};

export const First = () => <ChooseTheme />;
