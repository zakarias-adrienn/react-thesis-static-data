
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import CheckBoxSubject from './CheckBoxSubject'

// This default export determines where your story goes in the story list
export default {
  title: 'CheckBoxSubject',
  component: CheckBoxSubject,
};

const Template: Story<ComponentProps<typeof CheckBoxSubject>> = (args) => (
  <CheckBoxSubject {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};