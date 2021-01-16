import React, { ComponentProps } from 'react';

import SearchPage from './SearchPage';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPageFull/SearchPage',
  component: SearchPage,
};

const Template = (args) => (
  <SearchPage {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};