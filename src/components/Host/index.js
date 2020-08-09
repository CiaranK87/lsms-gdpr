import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Hosts from './Hosts/Hosts';

const HostPage = () => (
  <div>
    <h1>Host Page</h1>
    <p>This page keeps track of all company accomodation.</p>
    <Hosts />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HostPage);
