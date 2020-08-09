import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Transporters from './Transporters';

const TransporterPage = () => (
  <div>
    <h1>Transport Page</h1>
    <p>This page keeps track of all current company transport.</p>

    <Transporters />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(TransporterPage);
