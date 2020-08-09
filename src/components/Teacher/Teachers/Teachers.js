import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import TeacherList from './TeacherList';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Teachers.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const INTIAL_TEACHER_STATE = {
  firstName: '',
  surname: '',
  email: '',
  telNo: '',
  gardaVettingStatus: false,
};

class Teachers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacher: INTIAL_TEACHER_STATE,
      loading: false,
      teachers: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForTeachers();
  }

  onListenForTeachers = () => {
    this.setState({ loading: true });

    this.props.firebase
      .teachers()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const teacherObject = snapshot.val();

        if (teacherObject) {
          const teacherList = Object.keys(teacherObject).map(key => ({
            ...teacherObject[key],
            uid: key,
          }));

          this.setState({
            teachers: teacherList,
            loading: false,
          });
        } else {
          this.setState({ teachers: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.teacher().off();
  }

  onChangeFirstName = event => {
    const editTeacher = { ...this.state.teacher };
    editTeacher.firstName = event.target.value;
    this.setState({ teacher: editTeacher });
  };

  onChangeSurname = event => {
    const editTeacher = { ...this.state.teacher };
    editTeacher.surname = event.target.value;
    this.setState({ teacher: editTeacher });
  };

  onChangeEmail = event => {
    const editTeacher = { ...this.state.teacher };
    editTeacher.email = event.target.value;
    this.setState({ teacher: editTeacher });
  };

  onGardaVettingStatusChange = status => {
    const editTeacher = { ...this.state.teacher };
    editTeacher.gardaVettingStatus = status.target.checked;
    this.setState({ teacher: editTeacher });
  };

  onChangeTelNo = event => {
    const editTeacher = { ...this.state.teacher };
    editTeacher.telNo = event.target.value;
    this.setState({ teacher: editTeacher });
  };

  onCreateTeacher = event => {
    console.log('Create Teacher');

    this.props.firebase.teachers().push({
      firstName: this.state.teacher.firstName,
      surname: this.state.teacher.surname,
      email: this.state.teacher.email,
      telNo: this.state.teacher.telNo,
      gardaVettingStatus: this.state.teacher.gardaVettingStatus,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ teacher: INTIAL_TEACHER_STATE });

    event.preventDefault();
  };

  onEditTeacher = (teacher, updateTeacher) => {
    const { ...teacherSnapshot } = updateTeacher;

    this.props.firebase.teacher(teacher.uid).set({
      ...teacherSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveTeacher = uid => {
    console.log('Teacher id = ' + uid);
    this.props.firebase.teacher(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForTeachers,
    );
  };

  render() {
    const { teacher, teachers, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && teachers && teachers.length > 5 && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {teachers && (
              <TeacherList
                authUser={authUser}
                teachers={teachers}
                onEditTeacher={this.onEditTeacher}
                onRemoveTeacher={this.onRemoveTeacher}
              />
            )}

            {!teacher && <div>There are no teachers ...</div>}

            <hr />
            <h4>Add New Teacher</h4>

            <form onSubmit={event => this.onCreateTeacher(event)}>
              <div className="teacher__addForm">
                <TextField
                  type="text"
                  value={teacher.firstName || ''}
                  onChange={this.onChangeFirstName}
                  placeholder="First Name"
                  className="firstName"
                />
                <TextField
                  type="text"
                  value={teacher.surname}
                  onChange={this.onChangeSurname}
                  placeholder="Surname"
                  className="surname"
                />
                <TextField
                  type="text"
                  value={teacher.email}
                  onChange={this.onChangeEmail}
                  placeholder="Email"
                  className="email"
                />
                <FormGroup className="garda">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={teacher.gardaVettingStatus}
                        onChange={this.onGardaVettingStatusChange}
                        name="checkedA"
                      />
                    }
                    label="Garda Vetting Status"
                    color="primary"
                  />
                </FormGroup>
                <TextField
                  className="telNo"
                  type="number"
                  value={teacher.telNo}
                  onChange={this.onChangeTelNo}
                  placeholder="Telephone number"
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Teacher
                </Button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Teachers);
