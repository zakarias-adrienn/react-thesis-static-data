import * as React from "react";
import TeacherTopicsTable from "./TeacherTopicsTable";
import { Topic, Semester } from "../model/topics.model";
import { exampleTopics } from "../exampleData";

// fel kellene gyűrűzzön a törlés ide?
const TeachersTopic: React.FunctionComponent = () => {
  // TODO: kiszűrni a bejelentekezett felhasználó témáit
  const [topics, setTopics] = React.useState(exampleTopics);

  const getValidTopics = (): Topic[] => {
    const now = new Date().getFullYear();
    const month = new Date().getMonth();
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
    <div className="ms-Grid" dir="ltr" style={{ marginTop: "10px" }}>
      <h3>Érvényben levő témák</h3>
      <TeacherTopicsTable topics={getValidTopics()}></TeacherTopicsTable>
      <br />
      <h3>Lejárt témák</h3>
      <TeacherTopicsTable topics={getInvalidTopics()}></TeacherTopicsTable>
    </div>
  );
};

export default TeachersTopic;
