import { MsalProvider } from "@azure/msal-react";
import { AuthenticationResult, EventType, IPublicClientApplication } from "@azure/msal-browser";
import PropTypes from "prop-types";

import Main from "./layout/Main";
import AppRoutes from "./routes";

interface IAppProps {
  msalInstance: IPublicClientApplication;
}

export default function App({ msalInstance }: IAppProps) {
  msalInstance.addEventCallback((message: any) => {
    if (message.eventType === EventType.LOGIN_SUCCESS) {
      const result = message.payload as AuthenticationResult;
      const token = result.idToken;

      localStorage.setItem("token", token);
    }
    if (message.eventType === EventType.LOGOUT_SUCCESS) {
      localStorage.removeItem("token");
    }
  });

  return (
    <MsalProvider instance={msalInstance}>
      <Main>
        <AppRoutes />
      </Main>
    </MsalProvider>
  );
}

App.propTypes = {
  msalInstance: PropTypes.any.isRequired,
};
