import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Teachers from './Teachers/Teachers';

const TeachersPage = () => (
  <div>
    <h1>Teachers Page</h1>
    <p>This page keeps track of all current teachers.</p>

    <Teachers />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(TeachersPage);
