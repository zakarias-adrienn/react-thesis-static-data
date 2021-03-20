import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  EndSessionRequest,
  RedirectRequest,
  PopupRequest,
  SilentRequest
} from "@azure/msal-browser";
import { boolean } from "joi";

import { MSAL_CONFIG } from "./azure-authentication-config";

var roles = {
  isAdmin: false,
  isTeacher: false,
  isStudent: false
};

export class AzureAuthenticationContext {
  private myMSALObj: PublicClientApplication = new PublicClientApplication(MSAL_CONFIG);
  private account?: AccountInfo;
  private loginRedirectRequest?: RedirectRequest;
  private loginRequest?: any;
  private silentRequest?: any;

  public isAuthenticationConfigured = false;

  constructor() {
    // @ts-ignore
    this.account = null;
    this.setRequestObjects();
    if (MSAL_CONFIG?.auth?.clientId) {
      this.isAuthenticationConfigured = true;
    }
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: [
        "openid",
        "profile",
        "User.Read",
        "Directory.Read.All"
        //"GroupMember.Read.All"
        // "Organization.Read.All"
      ]
      //prompt: "select_account"
    };
    this.silentRequest = {
      account: +"",
      scopes: ["openid", "profile", "User.Read"]
    };

    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: window.location.href
    };
  }

  async login(signInType: string, setUser: any): Promise<void> {
    if (signInType === "loginPopup") {
      this.myMSALObj
        .loginPopup(this.loginRequest)
        .then(async (resp: AuthenticationResult) => {
          this.handleResponse(resp, setUser);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (signInType === "loginRedirect") {
      this.myMSALObj.loginRedirect(this.loginRedirectRequest);
    }
  }

  logout(account: AccountInfo): void {
    const logOutRequest: EndSessionRequest = {
      account
    };

    this.myMSALObj.logout(logOutRequest);
  }
  async handleResponse(response: AuthenticationResult, incomingFunction: any) {
    console.log(response);
    if (response !== null && response.account !== null) {
      this.account = response.account;
    } else {
      this.account = this.getAccount();
    }

    if (this.account) {
      incomingFunction(this.account);
    }

    this.silentRequest.account = this.getAccount();
    let tokenResponse: any = await this.myMSALObj.acquireTokenSilent(this.silentRequest);
    let payload = await fetch("https://graph.microsoft.com/beta/me/memberOf", {
      headers: {
        Authorization: "Bearer " + tokenResponse.accessToken
      }
    });
    let json = await payload.json();
    console.dir(json); //ebben van sok adat a bejelentkezettről - megkaptam a Tanulok csoportot
    // 57704862-4735-465b-8a04-40e913599005 - ez az id ha szerepel, akkor tanulorol van szó
    let isStudentArr = json.value.filter(
      (e: any) => e.id === "57704862-4735-465b-8a04-40e913599005"
    );
    if (isStudentArr.length > 0) {
      roles.isStudent = true;
    } else {
      roles.isTeacher = true;
    }
  }
  private getAccount(): AccountInfo | undefined {
    console.log(`loadAuthModule`);
    const currentAccounts = this.myMSALObj.getAllAccounts();
    console.log(currentAccounts);
    if (currentAccounts === null) {
      // @ts-ignore
      console.log("No accounts detected");
      return undefined;
    }

    if (currentAccounts.length > 1) {
      // TBD: Add choose account code here
      // @ts-ignore
      console.log("Multiple accounts detected, need to add choose account code.");
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
  }
}

export { roles }; // valahogy meg kell oldani
export default AzureAuthenticationContext;
