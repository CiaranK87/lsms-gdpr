import React from 'react';

import StudentItem from './StudentItem';
import { Table } from 'react-bootstrap';

const StudentList = ({
  authUser,
  students,
  onEditStudent,
  onRemoveStudent,
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {students.map(student => (
      <StudentItem
        authUser={authUser}
        key={student.uid}
        student={student}
        onEditStudent={onEditStudent}
        onRemoveStudent={onRemoveStudent}
      />
    ))}
    </tbody>
  </Table>
);

export default StudentList;
