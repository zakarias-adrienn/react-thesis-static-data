import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import Header from "./Header";
import MenuNavigate from "./MenuNavigate";
import UserThemes from "./UserThemes";
import TopicForm from "./TopicForm";
import TechnologyTable from "./TechnologyTable";
import AppliedStudents from "./AppliedStudents";
import TeachersTopics from "./TeachersTopics";

function Root() {
  return (
    <Router>
      <React.StrictMode>
        <Header></Header>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-smPull ms-md12 ms-lg12 ms-xl3">
              <MenuNavigate></MenuNavigate>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-smPull ms-md12 ms-lg12 ms-xl9">
              <Switch>
                <Route exact path="/">
                  <p style={{ fontSize: "18px" }}>
                    <b>Üdvözlet a témakereső modulban!</b> <br />
                    <br />
                    Diákként témaböngészésre és témára való jelentkezésre van lehetőség, tanároknak
                    pedig ez a modul a témameghirdetés, témaelfogadás/elutasítás funkciókat nyújtja.
                  </p>
                </Route>
                <Route path="/searchPage">
                  <SearchPage />
                </Route>
                <Route path="/createThesis">
                  <TopicForm />
                </Route>
                <Route exact path="/publishedThesis">
                  <TeachersTopics />
                </Route>
                <Route path="/myTopics">
                  <UserThemes />
                </Route>
                <Route path="/addNewTechnology">
                  <TechnologyTable></TechnologyTable>
                </Route>
                <Route path="/publishedThesis/editTopic/:id">
                  <TopicForm />
                </Route>
                {/* <Route path="/seeTopic/:id">
                    <SeeTheme></SeeTheme>
                  </Route> */}
                <Route path="/appliedStudents">
                  <AppliedStudents></AppliedStudents>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </React.StrictMode>
    </Router>
  );
}

export default Root;
