import React, { ComponentProps } from "react";

import ChooseTheme from "../modules/thesis/components/ChooseTheme";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/ChooseThemeStory",
  component: ChooseTheme
};

let checks = {
  BScThesis: true,
  BScTDK: false,
  MScThesis: false,
  MScTDK: false,
  Projekt: false
};
export const First = () => (
  <ChooseTheme checked={checks} onChange={() => console.log("változtat")} />
);
