import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Courses from './Courses/Courses';

const CoursePage = () => (
  <div>
    <h1>Course Page</h1>
    <Courses />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(CoursePage);
