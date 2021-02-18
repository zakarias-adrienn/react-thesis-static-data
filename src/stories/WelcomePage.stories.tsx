import { SwatchColorPicker } from "@fluentui/react";
import React from "react";
import WelcomePage from "../modules/thesis/components/WelcomePage";
import { Link, MemoryRouter, Route, Router, Switch } from "react-router-dom";
import SearchPage from "../modules/thesis/components/SearchPage";
import TopicForm from "../modules/thesis/components/TopicForm";
import PublishedThesis from "../modules/thesis/components/PublishedThesis";
import UserThemes from "../modules/thesis/components/UserThemes";

// This default export determines where your story goes in the story list
export default {
  title: "Welcome/WelcomePageStory",
  component: WelcomePage
};

export const First = () => (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/searchPage" component={SearchPage} />
      <Route path="/createThesis" component={TopicForm} />
      <Route path="/publishedThesis" component={PublishedThesis} />
      <Route path="/myTopics" exact component={UserThemes} />
    </Switch>
  </MemoryRouter>
);
