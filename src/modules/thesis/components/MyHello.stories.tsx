// MyHello.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import MyHello from './MyHello';

// This default export determines where your story goes in the story list
export default {
  title: 'Hello-h1',
  component: MyHello,
};

const Template: Story<ComponentProps<typeof MyHello>> = (args) => (
  <MyHello {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};