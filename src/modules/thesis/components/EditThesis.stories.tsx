import React, { ComponentProps } from "react";

import EditThesis from "./EditThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/EditThesisStory",
  component: EditThesis
};

const Template = (args) => <EditThesis {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
