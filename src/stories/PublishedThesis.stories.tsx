import React from "react";

import TeacherTopicsTable from "../modules/thesis/components/TeacherTopicsTable";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/PublishedThesisStory",
  component: TeacherTopicsTable,
  decorators: [
    (PublishedThesis: any) => (
      <MemoryRouter>
        <PublishedThesis />
      </MemoryRouter>
    )
  ]
};

export const First = () => <TeacherTopicsTable topics={[]} />;
