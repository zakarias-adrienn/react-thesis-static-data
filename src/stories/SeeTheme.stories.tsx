import React from "react";

import SeeTopic from "../modules/thesis/components/SeeTopic";
import { MemoryRouter } from "react-router-dom";
import { Topic } from "../modules/thesis/model/topics.model";

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

let exampleTopic: Topic = {
  id: "a",
  type: [],
  title: "CÍM",
  description: "LEÍRÁS",
  teacherId: "1",
  connectedSubjectIds: [],
  connectedTechnologyIds: [],
  numberOfPlaces: 1,
  schoolSemester: null,
  appliedStudentIds: [],
  language: []
};
export const First = () => <SeeTopic topic={exampleTopic} onBack={() => console.log("vissza")} />;
