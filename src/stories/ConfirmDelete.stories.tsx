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

export const Topic = () => <ConfirmDelete type="topic" onDelete={onDelete} id="id" name="name" />;
export const Technology = () => (
  <ConfirmDelete type="technology" onDelete={onDelete} id="id" name="name" />
);
