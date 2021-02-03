import React, { ComponentProps } from "react";

import Subjects from "../modules/thesis/components/Subjects";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/SubjectsStory",
  component: Subjects
};

export const First = () => <Subjects />;
