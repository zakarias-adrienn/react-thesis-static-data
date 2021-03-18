import React from "react";
import { Redirect, Route } from "react-router";

const TeacherRoute = ({ component, isTeacher, path, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isTeacher ? React.createElement(component, props) : <Redirect to={{ pathname: "/thesis" }} />;
  console.log(component);
  return <Route {...rest} render={routeComponent} />;
};

export default TeacherRoute;
