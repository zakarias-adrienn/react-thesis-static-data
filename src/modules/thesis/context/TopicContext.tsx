import React from "react";
import { Semester, Topic, TopicType, Language } from "../model/topics.model";

export const topics: Topic[] = [
  {
    id: "a",
    type: [TopicType.BScThesis],
    title: "Garbage Collector működése Javában",
    description: "Ez a leírásom",
    teacherId: "A",
    connectedSubjectIds: ["1", "2"],
    connectedTechnologyIds: [],
    numberOfPlaces: 1,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.Hungarian]
  },
  {
    id: "b",
    type: [TopicType.BScThesis],
    title: "Youniversity",
    description: "Ez a leírásom2",
    teacherId: "B",
    connectedSubjectIds: [],
    connectedTechnologyIds: [],
    numberOfPlaces: 4,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.Hungarian]
  }
];

export const MyTopicContext = React.createContext(topics);
