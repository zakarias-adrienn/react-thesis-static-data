import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import 'semantic-ui-css/semantic.min.css'

import ThesisTable from './ThesisTable';

const options = ["hallgató", "tanár"];

// This default export determines where your story goes in the story list
export default {
  title: 'ThesisTable',
  component: ThesisTable,
  argTypes: {
    view: {
      control: {
        type: 'select',
        options: options,
      }
    }
  },
};

const Template: Story<ComponentProps<typeof ThesisTable>> = ({view, ...args}) => (
  <ThesisTable view={view} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
};

export const SecondStory = Template.bind({});
SecondStory.args = {
  /* the args you need here will depend on your component */
};