import React, { ComponentProps } from 'react';

import ChooseTheme from './ChooseTheme';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/ChooseThemeStory',
  component: ChooseTheme,
};

const Template = (args) => (
  <ChooseTheme {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};