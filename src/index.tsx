import ReactDOM from "react-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";
import { msalConfig } from "./authConfig";
import ErrorBoundary from "components/ErrorBoundary";

export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <StyleSystemProvider>
          <CssBaseline />
          <App msalInstance={msalInstance} />
        </StyleSystemProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
