import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./modules/thesis/components/SearchPage";
import Header from "./modules/thesis/components/Header";
import MenuNavigate from "./modules/thesis/components/MenuNavigate";
import PublishedThesis from "./modules/thesis/components/PublishedThesis";
import UserThemes from "./modules/thesis/components/UserThemes";
import TopicForm from "./modules/thesis/components/TopicForm";
import TechnologyTable from "./modules/thesis/components/TechnologyTable";
import SeeTheme from "./modules/thesis/components/SeeTheme";
import AppliedStudents from "./modules/thesis/components/AppliedStudents";
import { MyTopicContext, topics } from "./modules/thesis/context/TopicContext";

function App() {
  let fakeTopic = {
    title: "FAKE-valami",
    description: "FAKE-hali",
    numOfPlaces: 3
    // startYear: 2020 - ehelyett más valami lesz
  };

  return (
    <MyTopicContext.Provider value={topics}>
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
                      Diákként témaböngészésre és témára való jelentkezésre van lehetőség,
                      tanároknak pedig ez a modul a témameghirdetés, témaelfogadás/elutasítás
                      funkciókat nyújtja.
                    </p>
                  </Route>
                  <Route path="/searchPage">
                    <SearchPage />
                  </Route>
                  <Route path="/createThesis">
                    <TopicForm />
                  </Route>
                  <Route path="/publishedThesis">
                    <PublishedThesis />
                  </Route>
                  <Route path="/myTopics">
                    <UserThemes />
                  </Route>
                  <Route path="/addNewTechnology">
                    <TechnologyTable></TechnologyTable>
                  </Route>
                  <Route path="/editTopic/:id">
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
    </MyTopicContext.Provider>
  );
}

export default App;
