import React from "react";

import AppliedStudents from "./AppliedStudents";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/AppliedStudents",
  component: AppliedStudents
};

const Template = (args) => <AppliedStudents {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
