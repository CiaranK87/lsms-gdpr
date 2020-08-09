import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import TransporterList from './TransporterList';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Transporters.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const INTIAL_TRANSPORTER_STATE = {
  firstName: '',
  surname: '',
  email: '',
  gardaVettingStatus: false,
  telNo: '',
};

class Transporters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transporter: INTIAL_TRANSPORTER_STATE,
      loading: false,
      transporters: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForTransporters();
  }

  onListenForTransporters = () => {
    this.setState({ loading: true });

    this.props.firebase
      .transporters()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const transporterObject = snapshot.val();

        if (transporterObject) {
          const transporterList = Object.keys(transporterObject).map(
            key => ({
              ...transporterObject[key],
              uid: key,
            }),
          );

          this.setState({
            transporters: transporterList,
            loading: false,
          });
        } else {
          this.setState({ transporters: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.transporter().off();
  }

  onChangeFirstName = event => {
    const editTransporter = { ...this.state.transporter };
    editTransporter.firstName = event.target.value;
    this.setState({ transporter: editTransporter });
  };

  onChangeSurname = event => {
    const editTransporter = { ...this.state.transporter };
    editTransporter.surname = event.target.value;
    this.setState({ transporter: editTransporter });
  };

  onChangeEmail = event => {
    const editTransporter = { ...this.state.transporter };
    editTransporter.email = event.target.value;
    this.setState({ transporter: editTransporter });
  };

  onGardaVettingStatusChange = status => {
    const editTransporter = { ...this.state.transporter };
    editTransporter.gardaVettingStatus = status.target.checked;
    this.setState({ transporter: editTransporter });
  };

  onChangeTelNo = event => {
    const editTransporter = { ...this.state.transporter };
    editTransporter.telNo = event.target.value;
    this.setState({ transporter: editTransporter });
  };

  onCreateTransporter = event => {
    console.log('Create Transporter');

    // const student = {
    //   firstName: event.target.value.firstName
    // };
    this.props.firebase.transporters().push({
      firstName: this.state.transporter.firstName,
      surname: this.state.transporter.surname,
      email: this.state.transporter.email,
      gardaVettingStatus: this.state.transporter.gardaVettingStatus,
      telNo: this.state.transporter.telNo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ transporter: INTIAL_TRANSPORTER_STATE });

    event.preventDefault();
  };

  onEditTransporter = (transporter, updateTransporter) => {
    const { ...transporterSnapshot } = updateTransporter;

    this.props.firebase.transporter(transporter.uid).set({
      ...transporterSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveTransporter = uid => {
    console.log('Transporter id = ' + uid);
    this.props.firebase.transporter(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForTransporters,
    );
  };

  render() {
    const { transporter, transporters, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && transporters && transporters.length > 5 && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {transporters && (
              <TransporterList
                authUser={authUser}
                transporters={transporters}
                onEditTransporter={this.onEditTransporter}
                onRemoveTransporter={this.onRemoveTransporter}
              />
            )}

            {!transporter && <div>There are no transporters ...</div>}

            <hr />
            <h4>Add New Transport</h4>

            <form onSubmit={event => this.onCreateTransporter(event)}>
              <div className="transporter__addForm">
                <TextField
                  type="text"
                  value={transporter.firstName || ''}
                  onChange={this.onChangeFirstName}
                  placeholder="First Name"
                  className="firstName"
                />
                <TextField
                  type="text"
                  value={transporter.surname}
                  onChange={this.onChangeSurname}
                  placeholder="Surname"
                  className="surname"
                />
                <TextField
                  type="text"
                  value={transporter.email}
                  onChange={this.onChangeEmail}
                  placeholder="Email"
                  className="email"
                />
                
                <FormGroup className="garda">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={transporter.gardaVettingStatus}
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
                  type="text"
                  value={transporter.telNo}
                  onChange={this.onChangeTelNo}
                  placeholder="Telephone number"
                />
                <Button type="submit" variant="contained" color="primary">
                  Add Transporter
                </Button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Transporters);
