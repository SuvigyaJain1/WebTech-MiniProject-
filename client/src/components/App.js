import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Navigator from './views/Navigator';
import ProfilePage from './views/ProfilePage';
import GroupPage from './views/GroupPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ padding: '0px', minHeight: 'calc(100vh - 80px)', overflow: 'hidden' }}>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />
          <Route exact path="/home" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route path = '/groups' component={Auth(GroupPage, true)} />
          <Route exact path='/profile' component = {Auth(ProfilePage, true)} />
        </Switch>
      </div>
      <Navigator />
    </Suspense>
  );
}

export default App;
