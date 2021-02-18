import React, { ComponentProps } from "react";

import MySubmitButton from "../modules/thesis/components/MySubmitButton";

// This default export determines where your story goes in the story list
export default {
  title: "SearchPage/ButtonStory",
  component: MySubmitButton
};

export const First = () => <MySubmitButton onClick={() => console.log("keresés")} />;
