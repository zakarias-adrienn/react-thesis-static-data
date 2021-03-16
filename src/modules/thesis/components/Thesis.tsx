import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";

// saját importok
import SearchPage from "./SearchPage";
import Header from "./Header";
import MenuNavigate from "./MenuNavigate";
import UserTopics from "./UserTopics";
import TopicForm from "./TopicForm";
import TechnologyTable from "./TechnologyTable";
import AppliedStudents from "./AppliedStudents";
import TeachersTopic from "./TeacherTopics";
import WelcomeMessage from "./WelcomeMessage";
import Contact from "./Contact";

const Thesis: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Header></Header>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-smPull ms-md12 ms-lg12 ms-xl3">
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" style={{ width: "60%" }} />
              <MenuNavigate></MenuNavigate>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-smPull ms-md12 ms-lg12 ms-xl9">
              <Switch>
                <Route exact path="/">
                  <WelcomeMessage />
                </Route>
                <Route path="/searchPage">
                  <SearchPage />
                </Route>
                <Route path="/createThesis">
                  <TopicForm />
                </Route>
                <Route exact path="/publishedThesis">
                  <TeachersTopic />
                </Route>
                <Route path="/myTopics">
                  <UserTopics />
                </Route>
                <Route path="/addNewTechnology">
                  <TechnologyTable></TechnologyTable>
                </Route>
                <Route path="/publishedThesis/editTopic/:id">
                  <TopicForm />
                </Route>
                <Route path="/appliedStudents">
                  <AppliedStudents></AppliedStudents>
                </Route>
                <Route path="/contact">
                  <Contact></Contact>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default Thesis;
