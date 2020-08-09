import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import StudentList from './StudentList';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Students.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const INTIAL_STUDENT_STATE = {
  firstName: '',
  surname: '',
  email: '',
  dateOfBirth: new Date(),
  telNo: '',
  address: {
    houseNumber: '',
    street: '',
    city: '',
    country: '',
    postCode: '',
  },
  nextOfKin: '',
  nextOfKinTelNo: '',
  hostFamily: '',
  agent: '',
};

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: INTIAL_STUDENT_STATE,
      loading: false,
      students: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForStudents();
  }

  onListenForStudents = () => {
    this.setState({ loading: true });

    this.props.firebase
      .students()
      .orderByChild('createdAt')
      .on('value', snapshot => {
        const studentObject = snapshot.val();

        if (studentObject) {
          const studentList = Object.keys(studentObject).map(key => ({
            ...studentObject[key],
            uid: key,
          }));

          this.setState({
            students: studentList,
            loading: false,
          });
        } else {
          this.setState({ students: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.students().off();
  }

  onChangeFirstName = event => {
    const editStudent = { ...this.state.student };
    editStudent.firstName = event.target.value;
    this.setState({ student: editStudent });
  };

  onChangeSurname = event => {
    const editStudent = { ...this.state.student };
    editStudent.surname = event.target.value;
    this.setState({ student: editStudent });
  };

  onChangeEmail = event => {
    const editStudent = { ...this.state.student };
    editStudent.email = event.target.value;
    this.setState({ student: editStudent });
  };

  onChangeDateOfBirth = date => {
    const editStudent = { ...this.state.student };
    editStudent.dateOfBirth = date.getTime();
    this.setState({ student: editStudent });
  };

  onChangeTelNo = event => {
    const editStudent = { ...this.state.student };
    editStudent.telNo = event.target.value;
    this.setState({ student: editStudent });
  };

  onCreateStudent = event => {
    this.props.firebase.students().push({
      firstName: this.state.student.firstName,
      surname: this.state.student.surname,
      email: this.state.student.email,
      dateOfBirth: this.state.student.dateOfBirth,
      telNo: this.state.student.telNo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ student: INTIAL_STUDENT_STATE });

    event.preventDefault();
  };

  onEditStudent = (student, updateStudent) => {
    const { ...studentSnapshot } = updateStudent;

    this.props.firebase.student(student.uid).set({
      ...studentSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveStudent = uid => {
    console.log('Student id = ' + uid);
    this.props.firebase.student(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForStudents,
    );
  };

  render() {
    const { student, students, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && students && students.length > 5 && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {students && (
              <StudentList
                authUser={authUser}
                students={students}
                onEditStudent={this.onEditStudent}
                onRemoveStudent={this.onRemoveStudent}
              />
            )}

            {!students && <div>There are no students ...</div>}

            <hr/>
            <h4>Add New Student</h4>

            <form onSubmit={event => this.onCreateStudent(event)}>
              <div className="student__addForm">
                <TextField
                  type="text"
                  value={student.firstName || ''}
                  onChange={this.onChangeFirstName}
                  placeholder="First Name"
                  className="firstName"
                />
                <TextField
                  type="text"
                  value={student.surname}
                  onChange={this.onChangeSurname}
                  placeholder="Surname"
                  className="surname"
                />
                <TextField
                  type="text"
                  value={student.email}
                  onChange={this.onChangeEmail}
                  placeholder="Email"
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
                    label="Date of Birth"
                    value={student.dateOfBirth}
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
                  value={student.telNo}
                  onChange={this.onChangeTelNo}
                  placeholder="Telephone number"
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Students);
