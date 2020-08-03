import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import StudentList from './StudentList';
import { initializeApp } from 'firebase';

const INTIAL_STUDENT_STATE = {
  firstName: '',
  surname: '',
  email: '',
  dateOfBirth: '',
  telNo: '',
  address: {
    houseNumber: '',
    street: '',
    city: '',
    country: '',
    postCode: ''
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
      .limitToLast(this.state.limit)
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
    const editStudent = {...this.state.student};
    editStudent.firstName = event.target.value;
    this.setState({ student: editStudent });
  };

  onCreateStudent = (event) => {
    console.log('Create Student');

    // const student = {
    //   firstName: event.target.value.firstName
    // };
    this.props.firebase.students().push({
      firstName: this.state.student.firstName,
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
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
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

            <form
              onSubmit={event =>
                this.onCreateStudent(event)
              }
            >
              <input
                type="text"
                value={student.firstName || ''}
                onChange={this.onChangeFirstName}
                placeholder="First Name"
              />
              {/* <input
                type="text"
                value={student.surname}
                // onChange={this.onChangeText}
                placeholder="Surname"
              />
              <input
                type="text"
                value={student.email}
                // onChange={this.onChangeText}
                placeholder="Email"
              />
              <input
                type="text"
                value={student.dateOfBirth}
                // onChange={this.onChangeText}
                placeholder="Date of birth"
              />
              <input
                type="text"
                value={student.telNo}
                // onChange={this.onChangeText}
                placeholder="Telephone number"
              /> */}
              <button type="submit">Save Student</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Students);
