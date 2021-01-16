import React from 'react';

import SeeTheme from './SeeTheme';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/SeeThemeStory',
  component: SeeTheme,
};

const Template = (args) => (
  <SeeTheme {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};