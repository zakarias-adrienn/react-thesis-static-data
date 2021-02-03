import React, { ComponentProps } from "react";

import EditThesis from "../modules/thesis/components/EditThesis";

// This default export determines where your story goes in the story list
export default {
  title: "Teacher/EditThesisStory",
  component: EditThesis
};

export const First = () => <EditThesis />;
