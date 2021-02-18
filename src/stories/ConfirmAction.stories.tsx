import React from "react";

import ConfirmAction from "../modules/thesis/components/ConfirmAction";

// This default export determines where your story goes in the story list
export default {
  title: "Administrator/ConfirmActionStory",
  component: ConfirmAction
};

export const First = () => (
  <ConfirmAction
    name="valami"
    notEmpty={true}
    onAddNew={() => console.log("hozzáadás")}
    updateTextField={() => console.log("kiüresítve")}
  />
);
