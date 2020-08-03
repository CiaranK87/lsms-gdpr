import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import StudentPage from '../Student';
import TeachersPage from '../Teacher';
import Header from '../Header';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './app.css'

const App = () => (
  <Router>
    <div className="app__page">
      <div className="app__sidebar">
        <Navigation />
      </div>

      <div className="app__mainContent">
        <Header></Header>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.STUDENTS} component={StudentPage} />
        <Route path={ROUTES.TEACHERS} component={TeachersPage} />
        
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
