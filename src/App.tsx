import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import WelcomePage from "./modules/thesis/components/WelcomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./modules/thesis/components/SearchPage";
import CreateThesis from "./modules/thesis/components/CreateThesis";
import Header from "./modules/thesis/components/Header";
import MenuNavigate from "./modules/thesis/components/MenuNavigate";
import PublishedThesis from "./modules/thesis/components/PublishedThesis";
import UserThemes from "./modules/thesis/components/UserThemes";
import AddNewTechnology from "./modules/thesis/components/AddNewTechnology";
import EditThesis from "./modules/thesis/components/EditThesis";

function App() {
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
                  <CreateThesis />
                </Route>
                <Route path="/publishedThesis">
                  <PublishedThesis />
                </Route>
                <Route path="/myTopics">
                  <UserThemes />
                </Route>
                <Route path="/addNewTechnology">
                  <AddNewTechnology />
                </Route>
                <Route path="/editTopic/1">
                  <EditThesis />
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
