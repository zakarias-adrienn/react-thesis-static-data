import React from "react";

import SeeTopic from "../modules/thesis/components/SeeTopic";
import { MemoryRouter } from "react-router-dom";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/SeeThemeStory",
  component: SeeTopic,
  decorators: [
    (SeeTheme: any) => (
      <MemoryRouter>
        <SeeTheme />
      </MemoryRouter>
    )
  ]
};

export const First = () => <SeeTopic id="valami" onBack={() => console.log("vissza")} />;
