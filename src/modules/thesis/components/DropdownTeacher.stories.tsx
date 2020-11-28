
import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import DropdownTeacher from './DropdownTeacher';

// This default export determines where your story goes in the story list
export default {
  title: 'DropdownTeacher',
  component: DropdownTeacher,
};

const Template: Story<ComponentProps<typeof DropdownTeacher>> = (args) => (
  <DropdownTeacher {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};