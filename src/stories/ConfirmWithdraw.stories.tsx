import React from "react";

import ConfirmWithdraw from "../modules/thesis/components/ConfirmWithdraw";

// This default export determines where your story goes in the story list
export default {
  title: "Studentdata/ConfirmWithdrawStory",
  component: ConfirmWithdraw
};

const onWithDraw = () => {
  console.log("Visszavonás");
};

export const First = () => <ConfirmWithdraw myId={"valami"} onWithdraw={onWithDraw} name="name" />;
