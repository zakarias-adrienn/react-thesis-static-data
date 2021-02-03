import React, { ComponentProps } from "react";

import ChooseLanguage from "../modules/thesis/components/ChooseLanguage";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/ChooseLanguageStory",
  component: ChooseLanguage
};

export const First = () => <ChooseLanguage />;
