import React, { ComponentProps } from "react";

import CreateThesis from "./CreateThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/CreateThesisStrory",
  component: CreateThesis
};

const Template = (args) => <CreateThesis {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
