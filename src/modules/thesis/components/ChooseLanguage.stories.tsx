import React, { ComponentProps } from 'react';

import ChooseLanguage from './ChooseLanguage';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/ChooseLanguageStory',
  component: ChooseLanguage,
};

const Template = (args) => (
  <ChooseLanguage {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};