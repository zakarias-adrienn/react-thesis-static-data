import React from "react";
import { Redirect, Route } from "react-router";

const AdminRoute = ({ component, isAdmin, path, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAdmin ? React.createElement(component, props) : <Redirect to={{ pathname: "/thesis" }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default AdminRoute;
