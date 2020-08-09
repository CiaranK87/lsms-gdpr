import React, { Component } from 'react';
import INTIAL_TRANSPORTER_STATE from './Transporters';
import { withFirebase } from '../../Firebase';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class TransporterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editTransporter: props.transporter,
      editMode: false,
    };

    this.onEditTransporter = this.props.onEditTransporter.bind(this);
    this.onRemoveTransporter = this.props.onRemoveTransporter.bind(
      this,
    );
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTransporter: this.props.transporter,
    }));
  };

  onChangeFirstName = event => {
    const editTransporter = { ...this.props.transporter };
    editTransporter.firstName = event.target.value;
    this.setState({ editTransporter: editTransporter });
  };

  onChangeSurname = event => {
    const editTransporter = { ...this.props.transporter };
    editTransporter.surname = event.target.value;
    this.setState({ editTransporter: editTransporter });
  };

  onChangeEmail = event => {
    const editTransporter = { ...this.props.transporter };
    editTransporter.email = event.target.value;
    this.setState({ editTransporter: editTransporter });
  };

  onGardaVettingStatusChange = status => {
    const editTransporter = { ...this.props.transporter };
    editTransporter.gardaVettingStatus = status.target.checked;
    this.setState({ editTransporter: editTransporter });
  };

  onChangetelNo = event => {
    const editTransporter = { ...this.props.transporter };
    editTransporter.telNo = event.target.value;
    this.setState({ editTransporter: editTransporter });
  };

  onSaveEditTransporter = () => {
    this.onEditTransporter(
      this.props.transporter,
      this.state.editTransporter,
    );

    this.setState({ editMode: false });
  };

  render() {
    const { transporter } = this.props;
    const { editMode, editTransporter } = this.state;

    return (
      <TableRow>
        {editMode ? (
          <>
            <TableCell>
              <TextField
                type="text"
                value={editTransporter.firstName}
                onChange={this.onChangeFirstName}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTransporter.surname}
                onChange={this.onChangeSurname}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTransporter.email}
                onChange={this.onChangeEmail}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTransporter.telNo}
                onChange={this.onChangetelNo}
              />
            </TableCell>
            <TableCell>
              <FormGroup className="garda">
                <FormControlLabel
                  control={
                    <Switch
                      checked={editTransporter.gardaVettingStatus}
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
            <TableCell>{transporter.firstName}</TableCell>
            <TableCell>{transporter.surname}</TableCell>
            <TableCell>{transporter.email}</TableCell>
            <TableCell>{transporter.telNo}</TableCell>
            <TableCell>
              {transporter.gardaVettingStatus ? 'Vetted' : 'Awaiting'}
            </TableCell>
          </>
        )}
        <TableCell>
          <span>
            {editMode ? (
              <span>
                <IconButton
                  aria-label="delete"
                  onClick={this.onSaveEditTransporter}
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
                onClick={() =>
                  this.onRemoveTransporter(transporter.uid)
                }
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

export default withFirebase(TransporterItem);
