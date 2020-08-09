import React, { Component } from 'react';
import INTIAL_HOST_STATE from './Hosts';
import { withFirebase } from '../../Firebase';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class HostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editHost: props.host,
      editMode: false,
    };

    this.onEditHost = this.props.onEditHost.bind(this);
    this.onRemoveHost = this.props.onRemoveHost.bind(this);
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editHost: this.props.host,
    }));
  };

  onChangeFirstName = event => {
    const editHost = { ...this.props.host };
    editHost.firstName = event.target.value;
    this.setState({ editHost: editHost });
  };

  onChangeSurname = event => {
    const editHost = { ...this.props.host };
    editHost.surname = event.target.value;
    this.setState({ editHost: editHost });
  };

  onChangeEmail = event => {
    const editHost = { ...this.props.host };
    editHost.email = event.target.value;
    this.setState({ editHost: editHost });
  };

  onGardaVettingStatusChange = status => {
    const editHost = { ...this.props.host };
    editHost.gardaVettingStatus = status.target.checked;
    this.setState({ editHost: editHost });
  };

  onChangetelNo = event => {
    const editHost = { ...this.props.host };
    editHost.telNo = event.target.value;
    this.setState({ editHost: editHost });
  };

  onChangeEircode = event => {
    const editHost = { ...this.props.host };
    editHost.eircode = event.target.value;
    this.setState({ editHost: editHost });
  };

  onSaveEditHost = () => {
    this.onEditHost(this.props.host, this.state.editHost);

    this.setState({ editMode: false });
  };

  render() {
    const { host } = this.props;
    const { editMode, editHost } = this.state;

    return (
      <TableRow>
        {editMode ? (
          <>
            <TableCell>
              <TextField
                type="text"
                value={editHost.firstName}
                onChange={this.onChangeFirstName}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editHost.surname}
                onChange={this.onChangeSurname}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editHost.email}
                onChange={this.onChangeEmail}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editHost.telNo}
                onChange={this.onChangetelNo}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editHost.eircode}
                onChange={this.onChangeEircode}
              />
            </TableCell>
            <TableCell>
              <FormGroup className="garda">
                <FormControlLabel
                  control={
                    <Switch
                      checked={editHost.gardaVettingStatus}
                      onChange={this.onGardaVettingStatusChange}
                      name="checkedA"
                    />
                  }
                  label="Garda Vetting Status"
                  color="primary"
                />
              </FormGroup>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{host.firstName}</TableCell>
            <TableCell>{host.surname}</TableCell>
            <TableCell>{host.email}</TableCell>
            <TableCell>{host.telNo}</TableCell>
            <TableCell>{host.eircode}</TableCell>
            <TableCell>
              {host.gardaVettingStatus
                ? 'Vetted'
                : 'Awaiting Vetting'}
            </TableCell>
          </>
        )}
        <TableCell>
          <span>
            {editMode ? (
              <span>
                <IconButton
                  aria-label="delete"
                  onClick={this.onSaveEditHost}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={this.onToggleEditMode}
                >
                  <CancelIcon />
                </IconButton>
              </span>
            ) : (
              <IconButton
                aria-label="delete"
                onClick={this.onToggleEditMode}
              >
                <EditIcon />
              </IconButton>
            )}

            {!editMode && (
              <IconButton
                aria-label="delete"
                onClick={() => this.onRemoveHost(host.uid)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

export default withFirebase(HostItem);
