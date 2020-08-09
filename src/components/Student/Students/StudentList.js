import React from 'react';

import StudentItem from './StudentItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StudentList = ({
  authUser,
  students,
  onEditStudent,
  onRemoveStudent,
}) => (
  <TableContainer component={Paper}>
  <Table stripedRows >
    <TableHead>
      <TableRow>
        <TableCell>First Name</TableCell>
        <TableCell>Surname</TableCell>
        <TableCell>E-Mail</TableCell>
        <TableCell>Date of Birth</TableCell>
        <TableCell>Tel. No.</TableCell>
        <TableCell className="actions">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {students.map(student => (
      <StudentItem
        authUser={authUser}
        key={student.uid}
        student={student}
        onEditStudent={onEditStudent}
        onRemoveStudent={onRemoveStudent}
      />
    ))}
    </TableBody>
  </Table>
  </TableContainer>
);

export default StudentList;
