import React, { ComponentProps } from 'react';

import Technologies from './Technologies';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage/TechnologiesStory',
  component: Technologies,
};

const Template = (args) => (
  <Technologies {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};