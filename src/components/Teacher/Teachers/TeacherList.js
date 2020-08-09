import React from 'react';

import TeacherItem from './TeacherItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TeacherList = ({
  authUser,
  teachers,
  onEditTeacher,
  onRemoveTeacher,
}) => (
  <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>First Name</TableCell>
        <TableCell>Surname</TableCell>
        <TableCell>E-Mail</TableCell>
        <TableCell>Tel. No.</TableCell>
        <TableCell>Garda Vetting</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {teachers.map(teacher => (
      <TeacherItem
        authUser={authUser}
        key={teacher.uid}
        teacher={teacher}
        onEditTeacher={onEditTeacher}
        onRemoveTeacher={onRemoveTeacher}
      />
    ))}
    </TableBody>
  </Table>
  </TableContainer>
);

export default TeacherList;
