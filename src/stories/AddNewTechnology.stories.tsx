import React from "react";

import AddNewTechnology from "../modules/thesis/components/AddNewTechnology";

export default {
  title: "Administrator/AddNewTechnologyStory",
  component: AddNewTechnology
};

export const First = () => (
  <AddNewTechnology name="" onAddNew={() => console.log("Hozzáadás")} technologies={{}} />
);
