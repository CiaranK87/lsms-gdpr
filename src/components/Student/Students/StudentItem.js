import React, { Component } from 'react';
import INTIAL_STUDENT_STATE from './Students'
import { withFirebase } from '../../Firebase';
import { Button} from 'react-bootstrap';

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editStudent: INTIAL_STUDENT_STATE,
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
    console.log()
    const editStudent = {...this.props.student};
    editStudent.firstName = event.target.value;
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
      <tr>
        {editMode ? (
          <input
            type="text"
            value={editStudent.firstName}
            onChange={this.onChangeFirstName}
          />
        ) : (
          <td>
            <strong>{student.firstName} {student.surname}</strong>
            {student.editedAt && <span>(Edited)</span>}
          </td>
        )}

          <span>
            {editMode ? (
              <span>
                <Button onClick={this.onSaveEditStudent}>Save</Button>
                <Button onClick={this.onToggleEditMode}>Reset</Button>
              </span>
            ) : (
              <Button onClick={this.onToggleEditMode}>Edit</Button>
            )}

            {!editMode && (
              <Button
                type="button"
                onClick={() => this.onRemoveStudent(student.uid)}
              >
                Delete
              </Button>
            )}
          </span>
      </tr>
    );
  }
}

export default withFirebase(StudentItem);
