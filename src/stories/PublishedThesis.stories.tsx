import React from "react";

import PublishedThesis from "../modules/thesis/components/PublishedThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/PublishedThesisStory",
  component: PublishedThesis
};

export const First = () => <PublishedThesis />;
