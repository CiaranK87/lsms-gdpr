import React from 'react';

import HostItem from './HostItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const HostList = ({
  authUser,
  hosts,
  onEditHost,
  onRemoveHost,
}) => (
  <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell className="firstName">First Name</TableCell>
        <TableCell className="surname">Surname</TableCell>
        <TableCell className="email"> E-Mail</TableCell>
        <TableCell className="telNo">Tel. No.</TableCell>
        <TableCell className="eircode">Eircode</TableCell>
        <TableCell className="garda">Garda Vetting</TableCell>
        <TableCell className="actions">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {hosts.map(host => (
      <HostItem
        authUser={authUser}
        key={host.uid}
        host={host}
        onEditHost={onEditHost}
        onRemoveHost={onRemoveHost}
      />
    ))}
    </TableBody>
  </Table>
  </TableContainer>
);

export default HostList;