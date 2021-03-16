import React from "react";

import StudentApplications from "../modules/thesis/components/StudentApplications";

// This default export determines where your story goes in the story list
export default {
  title: "StudentData/UserThemesStory",
  component: StudentApplications
};

export const First = () => <StudentApplications />;
