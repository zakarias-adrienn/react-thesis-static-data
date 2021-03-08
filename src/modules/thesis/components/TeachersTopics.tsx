import * as React from "react";
import ValidTeacherTopics from "./ValidTeacherTopics";
import ExpiredTeacherTopics from "./ExpiredTeacherTopics";
import { Topic, TopicType, SchoolSemester, Language, Semester } from "../model/topics.model";

const exampleTopics: Topic[] = [
  {
    id: "a",
    type: [TopicType.BScThesis],
    title: "Példa1",
    description: "Leírás1",
    teacherId: "1",
    connectedSubjectIds: ["Mesterséges intelligencia"],
    connectedTechnologyIds: ["JavaScript", "React"],
    numberOfPlaces: 3,
    schoolSemester: null, // tetszőleges
    appliedStudentIds: [],
    language: [Language.English, Language.Hungarian]
  },
  {
    id: "b",
    type: [TopicType.BScThesis],
    title: "Példa2",
    description: "Leírás2",
    teacherId: "1",
    connectedSubjectIds: ["Mesterséges intelligencia"],
    connectedTechnologyIds: ["JavaScript", "React"],
    numberOfPlaces: 3,
    schoolSemester: {
      year: 2020,
      half: Semester.Autumn
    },
    appliedStudentIds: [],
    language: [Language.English, Language.Hungarian]
  },
  {
    id: "c",
    type: [TopicType.BScThesis],
    title: "Példa3",
    description: "Leírás3",
    teacherId: "1",
    connectedSubjectIds: ["Mesterséges intelligencia"],
    connectedTechnologyIds: ["JavaScript", "React"],
    numberOfPlaces: 1,
    schoolSemester: {
      year: 2021,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.English, Language.Hungarian]
  },
  {
    id: "d",
    type: [TopicType.BScThesis],
    title: "Példa4",
    description: "Leírás4",
    teacherId: "1",
    connectedSubjectIds: ["Mesterséges intelligencia"],
    connectedTechnologyIds: ["JavaScript", "React"],
    numberOfPlaces: 3,
    schoolSemester: {
      year: 2020,
      half: Semester.Spring
    },
    appliedStudentIds: [],
    language: [Language.English, Language.Hungarian]
  }
];

// fel kellene gyűrűzzön a törlés ide?
const TeachersTopics: React.FunctionComponent = () => {
  const [topics, setTopics] = React.useState(exampleTopics);

  const getValidTopics = (): Topic[] => {
    const now = new Date().getFullYear();
    const month = new Date().getMonth();
    // JANUÁRTÓL A MÁSODIK FÉLÉVNEK SZÁMÍTSON MOST
    const half: Semester = month <= 6 ? Semester.Spring : Semester.Autumn;

    return topics.filter(
      (topic) =>
        topic.schoolSemester === null ||
        topic.schoolSemester.year >= now ||
        (topic.schoolSemester.year + 1 === now && topic.schoolSemester.half === half)
    );
  };

  const getInvalidTopics = (): Topic[] => {
    const validTopics: Topic[] = getValidTopics();
    return topics.filter((topic) => !validTopics.includes(topic));
  };

  return (
    <div className="ms-Grid" dir="ltr">
      <h3>Érvényben levő témák</h3>
      <ValidTeacherTopics topics={getValidTopics()}></ValidTeacherTopics>
      <br />
      <h3>Lejárt témák</h3>
      <ExpiredTeacherTopics topics={getInvalidTopics()}></ExpiredTeacherTopics>
    </div>
  );
};

export default TeachersTopics;
