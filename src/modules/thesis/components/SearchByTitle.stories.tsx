import React, { ComponentProps } from 'react';

import SearchByTitle from './SearchByTitle';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/SearchByTitleStory',
  component: SearchByTitle,
};

const Template = (args) => < SearchByTitle {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};