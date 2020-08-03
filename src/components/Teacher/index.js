import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Messages from '../Messages';

const TeachersPage = () => (
  <div>
    <h1>Teachers Page</h1>
    <p>This page allows.</p>

    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(TeachersPage);
