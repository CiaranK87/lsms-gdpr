import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Moment from 'react-moment';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editStudent: props.student,
      editMode: false,
    };

    this.onEditStudent = this.props.onEditStudent.bind(this);
    this.onRemoveStudent = this.props.onRemoveStudent.bind(this);
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editStudent: this.props.student,
    }));
  };

  onChangeFirstName = event => {
    const editStudent = { ...this.props.student };
    editStudent.firstName = event.target.value;
    this.setState({ editStudent: editStudent });
  };

  onChangeSurname = event => {
    const editStudent = { ...this.props.student };
    editStudent.surname = event.target.value;
    this.setState({ editStudent: editStudent });
  };

  onChangeEmail = event => {
    const editStudent = { ...this.props.student };
    editStudent.email = event.target.value;
    this.setState({ editStudent: editStudent });
  };

  onChangeDateOfBirth = date => {
    const editStudent = { ...this.props.student };
    editStudent.dateOfBirth = date.getTime();
    this.setState({ editStudent: editStudent });
  };

  onChangetelNo = event => {
    const editStudent = { ...this.props.student };
    editStudent.telNo = event.target.value;
    this.setState({ editStudent: editStudent });
  };

  onSaveEditStudent = () => {
    this.onEditStudent(this.props.student, this.state.editStudent);

    this.setState({ editMode: false });
  };

  render() {
    const { student } = this.props;
    const { editMode, editStudent } = this.state;

    return (
      <TableRow>
        {editMode ? (
          <>
            <TableCell>
              <TextField
                type="text"
                value={editStudent.firstName}
                onChange={this.onChangeFirstName}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editStudent.surname}
                onChange={this.onChangeSurname}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editStudent.email}
                onChange={this.onChangeEmail}
              />
            </TableCell>
            {/* <TableCell> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of birth"
                  value={editStudent.dateOfBirth}
                  onChange={this.onChangeDateOfBirth}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            {/* </TableCell> */}
            <TableCell>
              <TextField
                type="number"
                value={editStudent.telNo}
                onChange={this.onChangetelNo}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.surname}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>
              {student.dateOfBirth && (
                <Moment
                  date={student.dateOfBirth}
                  format="DD/MM/YYYY"
                />
              )}
            </TableCell>
            <TableCell>{student.telNo}</TableCell>
          </>
        )}
        <TableCell>
          <span>
            {editMode ? (
              <span>
                <IconButton
                  aria-label="delete"
                  onClick={this.onSaveEditStudent}
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
                onClick={() => this.onRemoveStudent(student.uid)}
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

export default withFirebase(StudentItem);
