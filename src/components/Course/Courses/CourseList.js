import React from 'react';

import CourseItem from './CourseItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CourseList = ({
  authUser,
  courses,
  onEditCourse,
  onRemoveCourse,
}) => (
  <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Course Title</TableCell>
        <TableCell>Course Duration</TableCell>
        <TableCell>Course Teacher</TableCell>
        <TableCell>Start Date</TableCell>
        <TableCell>Course Credits</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {courses.map(course => (
      <CourseItem
        authUser={authUser}
        key={course.uid}
        course={course}
        onEditCourse={onEditCourse}
        onRemoveCourse={onRemoveCourse}
      />
    ))}
    </TableBody>
  </Table>
  </TableContainer>
);

export default CourseList;
