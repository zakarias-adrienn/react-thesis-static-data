import React, { ComponentProps } from "react";

import TopicForm from "../modules/thesis/components/TopicForm";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/TopicFormStrory",
  component: TopicForm
};

export const First = () => <TopicForm />;

let values2 = { title: "valami", description: "még valami", numOfPlaces: 3, startYear: 2020 };
export const Second = () => <TopicForm values={values2} />;
