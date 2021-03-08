import React from "react";

import DialogToEditTechnology from "../modules/thesis/components/DialogToEditTechnology";

// This default export determines where your story goes in the story list
export default {
  title: "Administrator/DialogToEditTechnologyStory",
  component: DialogToEditTechnology
};

export const First = () => (
  <DialogToEditTechnology name="VALAMI" myId="valami" onSave={() => console.log("mentés")} />
);
