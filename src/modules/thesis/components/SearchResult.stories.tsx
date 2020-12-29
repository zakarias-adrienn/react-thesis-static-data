import React from 'react';

import SearchResult from './SearchResult';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/SearchResultStory',
  component: SearchResult,
};

const Template = (args) => (
  <SearchResult {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};