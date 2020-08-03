import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Students from './Students/Students';

const StudentPage = () => (
  <div>
    <h1>Student Page</h1>
    <p>This page allows.</p>

    <Students />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(StudentPage);
