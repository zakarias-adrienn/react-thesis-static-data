import React from "react";

import PublishedThesis from "./PublishedThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/PublishedThesisStory",
  component: PublishedThesis
};

const Template = (args) => <PublishedThesis {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
