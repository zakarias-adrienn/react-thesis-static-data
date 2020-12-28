import React from 'react';

import SearchTeacher from './SearchTeacher';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/SearchTeacherStory',
  component: SearchTeacher,
};

const Template = (args) => (
  <SearchTeacher {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};