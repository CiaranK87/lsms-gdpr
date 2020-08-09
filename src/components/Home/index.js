import React from 'react';
import { compose } from 'recompose';
import './Home.css';

import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
  <div className="app__page">
    <div className="page__title">
      <h1>Home Page</h1>
      <p>Welcome to Language School Management System.</p>
      <p>Please use the links on the Side Navigation bar to access the various GDPR Data Entry modules.</p>
    </div>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
