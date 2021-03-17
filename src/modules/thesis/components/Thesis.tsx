import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { rootPath } from "../path";

// saját importok
import SearchPage from "./SearchPage";
import Header from "./Header";
import MenuNavigate from "./MenuNavigate";
import StudentApplications from "./StudentApplications";
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
                {/* just for development, delete when merge with core */}
                <Route exact path="/" component={() => <Redirect to="/thesis" />} />
                <Route exact path={rootPath}>
                  <WelcomeMessage />
                </Route>
                <Route path={rootPath + "/searchPage"}>
                  <SearchPage />
                </Route>
                <Route path={rootPath + "/createThesis"}>
                  <TopicForm />
                </Route>
                <Route exact path={rootPath + "/publishedThesis"}>
                  <TeachersTopic />
                </Route>
                <Route path={rootPath + "/myTopics"}>
                  <StudentApplications />
                </Route>
                <Route path={rootPath + "/addNewTechnology"}>
                  <TechnologyTable></TechnologyTable>
                </Route>
                <Route path={rootPath + "/publishedThesis/editTopic/:id"}>
                  <TopicForm />
                </Route>
                <Route path={rootPath + "/appliedStudents"}>
                  <AppliedStudents></AppliedStudents>
                </Route>
                {/* ha egyik route sem talál, visszairányítás egyelőre */}
                <Route render={() => <Redirect to="/thesis" />} />
              </Switch>
            </div>
          </div>
        </div>
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default Thesis;
