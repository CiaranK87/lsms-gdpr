import React, { Component } from 'react';
import INTIAL_TEACHER_STATE from './Teachers';
import { withFirebase } from '../../Firebase';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class TeacherItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editTeacher: props.teacher,
      editMode: false,
    };

    this.onEditTeacher = this.props.onEditTeacher.bind(this);
    this.onRemoveTeacher = this.props.onRemoveTeacher.bind(this);
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTeacher: this.props.teacher,
    }));
  };

  onChangeFirstName = event => {
    const editTeacher = { ...this.props.teacher };
    editTeacher.firstName = event.target.value;
    this.setState({ editTeacher: editTeacher });
  };

  onChangeSurname = event => {
    const editTeacher = { ...this.props.teacher };
    editTeacher.surname = event.target.value;
    this.setState({ editTeacher: editTeacher });
  };

  onChangeEmail = event => {
    const editTeacher = { ...this.props.teacher };
    editTeacher.email = event.target.value;
    this.setState({ editTeacher: editTeacher });
  };

  onGardaVettingStatusChange = status => {
    const editTeacher = { ...this.props.teacher };
    editTeacher.gardaVettingStatus = status.target.checked;
    this.setState({ editTeacher: editTeacher });
  };

  onChangetelNo = event => {
    const editTeacher = { ...this.props.teacher };
    editTeacher.telNo = event.target.value;
    this.setState({ editTeacher: editTeacher });
  };

  onSaveEditTeacher = () => {
    this.onEditTeacher(this.props.teacher, this.state.editTeacher);

    this.setState({ editMode: false });
  };

  render() {
    const { teacher } = this.props;
    const { editMode, editTeacher } = this.state;

    return (
      <TableRow>
        {editMode ? (
          <>
            <TableCell>
              <TextField
                type="text"
                value={editTeacher.firstName}
                onChange={this.onChangeFirstName}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTeacher.surname}
                onChange={this.onChangeSurname}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTeacher.email}
                onChange={this.onChangeEmail}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editTeacher.telNo}
                onChange={this.onChangetelNo}
              />
            </TableCell>
            <TableCell className="garda">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editTeacher.gardaVettingStatus}
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
            <TableCell>{teacher.firstName}</TableCell>
            <TableCell>{teacher.surname}</TableCell>
            <TableCell>{teacher.email}</TableCell>
            <TableCell>{teacher.telNo}</TableCell>
            <TableCell>
              {teacher.gardaVettingStatus
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
                  aria-label="save"
                  onClick={this.onSaveEditTeacher}
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
                onClick={() => this.onRemoveTeacher(teacher.uid)}
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

export default withFirebase(TeacherItem);
