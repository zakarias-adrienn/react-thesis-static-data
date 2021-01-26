import React from "react";

import Teachers2 from "./Teachers2";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/Teachers2",
  component: Teachers2
};

const Template = (args) => <Teachers2 {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};
