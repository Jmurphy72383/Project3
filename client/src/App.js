import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import './App.css';
import Home from "./pages/Home";
import Nyse from "./pages/Nyse";
import Nasdaq from "./pages/Nasdaq";
import CryptoCurrency from "./pages/Crypto";
import Portfolio from "./pages/Portfolio";
import Nav from "./components/Nav";
import Login from "./components/Auth/Login";

const config = {
  issuer: 'https://dev-873570.oktapreview.com/oauth2/default',
  redirect_uri: 'https://rocky-retreat-71857.herokuapp.com/home',
  client_id: '0oaic8dsmd0mIfUrA0h7'
}

//window.location.origin + '/implicit/callback'

function onAuthRequired({history}) {
  history.push('/login');
}

const App = () => (
  <Router>
    <Security issuer={config.issuer}
              client_id={config.client_id}
              redirect_uri={config.redirect_uri}
              onAuthRequired={onAuthRequired}
    >
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <SecureRoute exact path="/nyse" component={Nyse} />
          <SecureRoute exact path="/nasdaq" component={Nasdaq} />
          <SecureRoute exact path="/crypto" component={CryptoCurrency} />
          <SecureRoute exact path="/portfolio" component={Portfolio} />
          <Route path="/login" render={() => <Login baseUrl="https://dev-873570.oktapreview.com" />} />
          <Route path='/implicit/callback' component={ImplicitCallback}/>
        </Switch>
      </div>
    </Security>
  </Router>
);

export default App;