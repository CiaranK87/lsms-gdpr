import React from 'react';

import TransporterItem from './TransporterItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TransporterList = ({
  authUser,
  transporters,
  onEditTransporter,
  onRemoveTransporter,
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
    {transporters.map(transporter => (
      <TransporterItem
        authUser={authUser}
        key={transporter.uid}
        transporter={transporter}
        onEditTransporter={onEditTransporter}
        onRemoveTransporter={onRemoveTransporter}
      />
    ))}
    </TableBody>
  </Table>
  </TableContainer>
);

export default TransporterList;
