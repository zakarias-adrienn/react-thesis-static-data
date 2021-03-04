import * as React from "react";
import PublishedThesis from "./PublishedThesis";
import ExpiredThesis from "./ExpiredThesis";

const TeachersTopics: React.FunctionComponent = () => {
  return (
    <div className="ms-Grid" dir="ltr">
      <h3>Érvényben levő témák</h3>
      <PublishedThesis></PublishedThesis>
      <h3>Lejárt témák</h3>
      <ExpiredThesis></ExpiredThesis>
    </div>
  );
};

export default TeachersTopics;
