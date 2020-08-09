import React, { Component } from 'react';
import INTIAL_COURSE_STATE from './Courses';
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

class CourseItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editCourse: INTIAL_COURSE_STATE,
      editMode: false,
    };

    this.onEditCourse = this.props.onEditCourse.bind(this);
    this.onRemoveCourse = this.props.onRemoveCourse.bind(this);
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editCourse: this.props.course,
    }));
  };

  onChangeFirstName = event => {
    const editCourse = { ...this.props.course };
    editCourse.firstName = event.target.value;
    this.setState({ editCourse: editCourse });
  };

  onChangeSurname = event => {
    const editCourse = { ...this.props.course };
    editCourse.surname = event.target.value;
    this.setState({ editCourse: editCourse });
  };

  onChangeEmail = event => {
    const editCourse = { ...this.props.course };
    editCourse.email = event.target.value;
    this.setState({ editCourse: editCourse });
  };

  onChangeDateOfBirth = date => {
    const editCourse = { ...this.props.course };
    editCourse.dateOfBirth = date.getTime();
    this.setState({ editCourse: editCourse });
  };

  onChangetelNo = event => {
    const editCourse = { ...this.props.course };
    editCourse.telNo = event.target.value;
    this.setState({ editCourse: editCourse });
  };

  onSaveEditCourse = () => {
    this.onEditCourse(this.props.course, this.state.editCourse);

    this.setState({ editMode: false });
  };

  render() {
    const { course } = this.props;
    const { editMode, editCourse } = this.state;

    return (
      <TableRow>
        {editMode ? (
          <>
            <TableCell>
              <TextField
                type="text"
                value={editCourse.firstName}
                onChange={this.onChangeFirstName}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editCourse.surname}
                onChange={this.onChangeSurname}
              />
            </TableCell>
            <TableCell>
              <TextField
                type="text"
                value={editCourse.email}
                onChange={this.onChangeEmail}
              />
            </TableCell>
            <TableCell>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Start Date"
                  value={editCourse.dateOfBirth}
                  onChange={this.onChangeDateOfBirth}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </TableCell>
            <TableCell>
              <TextField
                type="number"
                value={editCourse.telNo}
                onChange={this.onChangetelNo}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>{course.firstName}</TableCell>
            <TableCell>{course.surname}</TableCell>
            <TableCell>{course.email}</TableCell>
            <TableCell>
              {course.dateOfBirth && (
                <Moment
                  date={course.dateOfBirth}
                  format="DD/MM/YYYY"
                />
              )}
            </TableCell>
            <TableCell>{course.telNo}</TableCell>
          </>
        )}
        <TableCell>
          <span>
            {editMode ? (
              <span>
                <IconButton
                  aria-label="delete"
                  onClick={this.onSaveEditCourse}
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
                onClick={() => this.onRemoveCourse(course.uid)}
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

export default withFirebase(CourseItem);
