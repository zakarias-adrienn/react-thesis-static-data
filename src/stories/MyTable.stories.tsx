// MyTable.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import MyTable from '../modules/thesis/components/MyTable';

// This default export determines where your story goes in the story list
export default {
  title: 'Table',
  component: MyTable,
};

const Template: Story<ComponentProps<typeof MyTable>> = (args) => (
  <MyTable {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};