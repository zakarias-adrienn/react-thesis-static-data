import React from "react";
import { Redirect, Route } from "react-router";

const StudentRoute = ({ component, isStudent, path, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isStudent ? React.createElement(component, props) : <Redirect to={{ pathname: "/thesis" }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default StudentRoute;
