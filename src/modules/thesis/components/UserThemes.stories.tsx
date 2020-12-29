import React from 'react';

import UserThemes from './UserThemes';

// This default export determines where your story goes in the story list
export default {
  title: 'UserThemes/UserThemesStory',
  component: UserThemes,
};

const Template = (args) => (
  <UserThemes {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};