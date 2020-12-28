import React, { ComponentProps } from 'react';

import Subjects from './Subjects';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/SubjectsStory',
  component: Subjects,
};

const Template = (args) => (
  <Subjects {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};