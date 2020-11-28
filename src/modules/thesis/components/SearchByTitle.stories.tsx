
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import SearchByTitle from './SearchByTitle';

// This default export determines where your story goes in the story list
export default {
  title: 'SearchByTitle',
  component: SearchByTitle,
};

const Template: Story<ComponentProps<typeof SearchByTitle>> = (args) => (
  <SearchByTitle {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};