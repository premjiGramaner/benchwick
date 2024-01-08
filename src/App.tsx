import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import "@Assets/styles/main.css";
import "@Assets/styles/style.scss";

import { gapi, loadGapiInsideDOM } from 'gapi-script';


import MainRouter from "./router";
import AUTH_JSON from "./utils/client_secret.json";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App(props: any) {

  const loadGApi = async () => {
    const gapi = await loadGapiInsideDOM();
  }

  useEffect(() => {
    function initGetTokenInstance() {
      gapi.client.init({
        clientId: AUTH_JSON.web.client_id,
        scope: ""
      })
    }

    gapi.load('client:auth2', initGetTokenInstance);
    loadGApi();
  }, [])

  return (
    <Router>
      <GoogleOAuthProvider clientId={AUTH_JSON.web.client_id}>
        <MainRouter {...props} />
      </GoogleOAuthProvider>
    </Router>
  )
}
