import React from "react";

import ValidTeacherTopics from "../modules/thesis/components/ValidTeacherTopics";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/PublishedThesisStory",
  component: ValidTeacherTopics,
  decorators: [
    (PublishedThesis: any) => (
      <MemoryRouter>
        <PublishedThesis />
      </MemoryRouter>
    )
  ]
};

export const First = () => <ValidTeacherTopics topics={[]} />;
