import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./modules/thesis/components/SearchPage";
import CreateThesis from "./modules/thesis/components/TopicForm";
import Header from "./modules/thesis/components/Header";
import MenuNavigate from "./modules/thesis/components/MenuNavigate";
import PublishedThesis from "./modules/thesis/components/PublishedThesis";
import UserThemes from "./modules/thesis/components/UserThemes";
import AddNewTechnology from "./modules/thesis/components/AddNewTechnology";
import TopicForm from "./modules/thesis/components/TopicForm";
import TechnologyTable from "./modules/thesis/components/TechnologyTable";

function App() {
  let fakeTopic = {
    title: "FAKE-valami",
    description: "FAKE-hali",
    numOfPlaces: 3,
    startYear: 2020
  };

  console.log();

  return (
    <Router>
      <React.StrictMode>
        <Header></Header>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm3">
              <MenuNavigate></MenuNavigate>
            </div>
            <div className="ms-Grid-col ms-sm9">
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
                <Route path="/publishedThesis">
                  <PublishedThesis />
                </Route>
                <Route path="/myTopics">
                  <UserThemes />
                </Route>
                <Route path="/addNewTechnology">
                  <AddNewTechnology />
                  <h3>Adatbázisban levő technológiák</h3>
                  <TechnologyTable></TechnologyTable>
                </Route>
                <Route exact path="/editTopic/:id">
                  <TopicForm values={fakeTopic} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </React.StrictMode>
    </Router>
  );
}

export default App;
