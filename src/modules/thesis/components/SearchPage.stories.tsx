
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import SearchPage from './SearchPage'

// This default export determines where your story goes in the story list
export default {
  title: 'SearchPage',
  component: SearchPage,
};

const Template: Story<ComponentProps<typeof SearchPage>> = (args) => (
  <SearchPage {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};