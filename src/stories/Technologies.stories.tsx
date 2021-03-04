import React, { ComponentProps } from "react";

import Technologies from "../modules/thesis/components/Technologies";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/TechnologiesStory",
  component: Technologies
};

export const First = () => (
  <Technologies technologies={[]} onChange={() => console.log("változik")} />
);
