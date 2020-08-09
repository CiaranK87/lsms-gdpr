import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import StudentPage from '../Student';
import TeachersPage from '../Teacher';
import HostsPage from '../Host';
import TransportersPage from '../Transport';
import CoursesPage from '../Course';
import Header from '../Header';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './app.css';

const App = () => (
  <Router>
    <div className="app__page">
      <Header className="header__content"/>
      <div className="body__content">
        <div className="app__sidebar">
          <Navigation />
        </div>
        <div className="app__mainContent">
          <Route
            exact
            path={ROUTES.LANDING}
            component={SignInPage}
          />
          {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.STUDENTS} component={StudentPage} />
          <Route path={ROUTES.TEACHERS} component={TeachersPage} />
          <Route path={ROUTES.TRANSPORTERS} component={TransportersPage} />
          <Route path={ROUTES.HOSTS} component={HostsPage} />
          <Route path={ROUTES.COURSES} component={CoursesPage} />

          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
