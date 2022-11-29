import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const domain = "dev-n1hg4xkscpswaxcn.us.auth0.com"
const clientId = "BimEvm5GZV6Jl2j7zjqJghP7R05xsjwV"

console.log(window.location.origin)

ReactDOM.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri="http://localhost:3000"
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);
