import React from "react";

import SeeTheme from "../modules/thesis/components/SeeTheme";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/SeeThemeStory",
  component: SeeTheme,
  decorators: [
    (SeeTheme: any) => (
      <MemoryRouter>
        <SeeTheme />
      </MemoryRouter>
    )
  ]
};

export const First = () => <SeeTheme id="valami" onBack={() => console.log("vissza")} />;
