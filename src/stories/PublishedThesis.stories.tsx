import React from "react";

import PublishedThesis from "../modules/thesis/components/PublishedThesis";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/PublishedThesisStory",
  component: PublishedThesis,
  decorators: [
    (PublishedThesis: any) => (
      <MemoryRouter>
        <PublishedThesis />
      </MemoryRouter>
    )
  ]
};

export const First = () => <PublishedThesis />;
