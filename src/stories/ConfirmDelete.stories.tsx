import React from "react";

import ConfirmDelete from "../modules/thesis/components/ConfirmDelete";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/ConfirmDeleteStory",
  component: ConfirmDelete
};

const onDelete = (id: string, toggleHideDialog: Function) => {
  console.log("nem tudom ez mi lenne");
};

export const Topic = () => <ConfirmDelete text="topic" onDelete={onDelete} />;
export const Technology = () => <ConfirmDelete text="technology" onDelete={onDelete} />;
