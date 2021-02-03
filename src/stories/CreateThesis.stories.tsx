import React, { ComponentProps } from "react";

import CreateThesis from "../modules/thesis/components/CreateThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/CreateThesisStrory",
  component: CreateThesis
};

export const First = () => <CreateThesis />;
