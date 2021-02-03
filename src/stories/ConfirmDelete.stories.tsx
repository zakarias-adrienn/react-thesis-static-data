import React from "react";

import ConfirmDelete from "../modules/thesis/components/ConfirmDelete";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/ConfirmDeleteStory",
  component: ConfirmDelete
};

export const Topic = () => <ConfirmDelete text="topic" />;
export const Technology = () => <ConfirmDelete text="technology" />;
