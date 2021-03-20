import React, { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import AzureAuthenticationButton from "./azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";
import { Person } from "@microsoft/mgt-react";

import Thesis from "./modules/thesis/components/Thesis";

function App() {
  // current authenticated user
  const [currentUser, setCurrentUser] = useState<AccountInfo>();

  // authentication callback
  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  // Render JSON data in readable format
  const PrettyPrintJson = ({ data }: any) => {
    console.log(currentUser);
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const personDetails = {
    displayName: currentUser?.name
  };

  return (
    <>
      <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
      {currentUser && (
        <div>
          <PrettyPrintJson data={currentUser} />
          <Person personDetails={personDetails}></Person>
        </div>
      )}
      <br />
      <Thesis></Thesis>
    </>
  );
}

export default App;
