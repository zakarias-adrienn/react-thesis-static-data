import React, { ComponentProps } from "react";

import TopicForm from "../modules/thesis/components/TopicForm";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/TopicFormStrory",
  component: TopicForm
};

export const First = () => <TopicForm />;

export const Second = () => <TopicForm />; // URL-ből jön a dolog
