import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import CourseList from './CourseList';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Courses.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const INTIAL_COURSE_STATE = {
  firstName: '',
  surname: '',
  email: '',
  dateOfBirth: new Date(),
  telNo: '',
};

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: INTIAL_COURSE_STATE,
      loading: false,
      courses: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForCourses();
  }

  onListenForCourses = () => {
    this.setState({ loading: true });

    this.props.firebase
      .courses()
      .orderByChild('createdAt')
      .on('value', snapshot => {
        const courseObject = snapshot.val();

        if (courseObject) {
          const courseList = Object.keys(courseObject).map(key => ({
            ...courseObject[key],
            uid: key,
          }));

          this.setState({
            courses: courseList,
            loading: false,
          });
        } else {
          this.setState({ courses: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.courses().off();
  }

  onChangeFirstName = event => {
    const editCourse = { ...this.state.course };
    editCourse.firstName = event.target.value;
    this.setState({ course: editCourse });
  };

  onChangeSurname = event => {
    const editCourse = { ...this.state.course };
    editCourse.surname = event.target.value;
    this.setState({ course: editCourse });
  };

  onChangeEmail = event => {
    const editCourse = { ...this.state.course };
    editCourse.email = event.target.value;
    this.setState({ course: editCourse });
  };

  onChangeDateOfBirth = date => {
    const editCourse = { ...this.state.course };
    editCourse.dateOfBirth = date.getTime();
    this.setState({ course: editCourse });
  };

  onChangeTelNo = event => {
    const editCourse = { ...this.state.course };
    editCourse.telNo = event.target.value;
    this.setState({ course: editCourse });
  };

  onCreateCourse = event => {
    console.log('Create course');

    this.props.firebase.courses().push({
      firstName: this.state.course.firstName,
      surname: this.state.course.surname,
      email: this.state.course.email,
      dateOfBirth: this.state.course.dateOfBirth,
      telNo: this.state.course.telNo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ course: INTIAL_COURSE_STATE });

    event.preventDefault();
  };

  onEditCourse = (course, updateCourse) => {
    const { ...courseSnapshot } = updateCourse;

    this.props.firebase.course(course.uid).set({
      ...courseSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveCourse = uid => {
    console.log('Course id = ' + uid);
    this.props.firebase.course(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForCourses,
    );
  };

  render() {
    const { course, courses, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && courses && courses.length > 5 && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {courses && (
              <CourseList
                authUser={authUser}
                courses={courses}
                onEditCourse={this.onEditCourse}
                onRemoveCourse={this.onRemoveCourse}
              />
            )}

            {!courses && <div>There are no courses ...</div>}

            <hr/>
            <h4>Add New Course</h4>

            <form onSubmit={event => this.onCreateCourse(event)}>
              <div className="course__addForm">
                <TextField
                  type="text"
                  value={course.firstName || ''}
                  onChange={this.onChangeFirstName}
                  placeholder="Course Title"
                  className="firstName"
                />
                <TextField
                  type="text"
                  value={course.surname}
                  onChange={this.onChangeSurname}
                  placeholder="Course Duration"
                  className="surname"
                />
                <TextField
                  type="text"
                  value={course.email}
                  onChange={this.onChangeEmail}
                  placeholder="Course Teacher"
                  className="email"
                />
                {/* <TextField
                type="text"
                value={student.dateOfBirth}
                onChange={this.onChangeDateOfBirth}
                placeholder="Date of birth"
              /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Course start date"
                    value={course.dateOfBirth}
                    onChange={this.onChangeDateOfBirth}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className="dateOfBirth"
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  className="telNo"
                  type="number"
                  value={course.telNo}
                  onChange={this.onChangeTelNo}
                  placeholder="Course Credits"
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Course
                </Button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Courses);