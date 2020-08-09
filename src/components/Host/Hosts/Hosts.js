import React, { Component } from 'react';

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';
import HostList from './HostList';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './Hosts.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const INTIAL_HOST_STATE = {
  firstName: '',
  surname: '',
  email: '',
  gardaVettingStatus: false,
  eircode: '',
  telNo: '',
};

class Hosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: INTIAL_HOST_STATE,
      loading: false,
      hosts: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForHosts();
  }

  onListenForHosts = () => {
    this.setState({ loading: true });

    this.props.firebase
      .hosts()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const hostObject = snapshot.val();

        if (hostObject) {
          const hostList = Object.keys(hostObject).map(key => ({
            ...hostObject[key],
            uid: key,
          }));

          this.setState({
            hosts: hostList,
            loading: false,
          });
        } else {
          this.setState({ hosts: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.hosts().off();
  }

  onChangeFirstName = event => {
    const editHost = { ...this.state.host };
    editHost.firstName = event.target.value;
    this.setState({ host: editHost });
  };

  onChangeSurname = event => {
    const editHost = { ...this.state.host };
    editHost.surname = event.target.value;
    this.setState({ host: editHost });
  };

  onChangeEmail = event => {
    const editHost = { ...this.state.host };
    editHost.email = event.target.value;
    this.setState({ host: editHost });
  };

  onGardaVettingStatusChange = status => {
    const editHost = { ...this.state.host };
    editHost.gardaVettingStatus = status.target.checked;
    this.setState({ host: editHost });
  };

  onChangeEircode = event => {
    const editHost = { ...this.state.host };
    editHost.eircode = event.target.value;
    this.setState({ host: editHost });
  };

  onChangeTelNo = event => {
    const editHost = { ...this.state.host };
    editHost.telNo = event.target.value;
    this.setState({ host: editHost });
  };

  onCreateHost = event => {
    console.log('Create Host');

    this.props.firebase.hosts().push({
      firstName: this.state.host.firstName,
      surname: this.state.host.surname,
      email: this.state.host.email,
      gardaVettingStatus: this.state.host.gardaVettingStatus,
      eircode: this.state.host.eircode,
      telNo: this.state.host.telNo,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ host: INTIAL_HOST_STATE });

    event.preventDefault();
  };

  onEditHost = (host, updateHost) => {
    const { ...hostSnapshot } = updateHost;

    this.props.firebase.host(host.uid).set({
      ...hostSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveHost = uid => {
    console.log('Host id = ' + uid);
    this.props.firebase.host(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForHosts,
    );
  };

  render() {
    const { host, hosts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && hosts && hosts.length > 5 && (
              <Button type="button" onClick={this.onNextPage}>
                More
              </Button>
            )}

            {loading && <div>Loading ...</div>}

            {hosts && (
              <HostList
                authUser={authUser}
                hosts={hosts}
                onEditHost={this.onEditHost}
                onRemoveHost={this.onRemoveHost}
              />
            )}

            {!hosts && <div>There are no hosts ...</div>}

            <hr />
            <h4>Add New Host</h4>

            <form onSubmit={event => this.onCreateHost(event)}>
              <div className="host__addForm">
                <TextField
                  type="text"
                  value={host.firstName || ''}
                  onChange={this.onChangeFirstName}
                  placeholder="First Name"
                  className="firstName"
                />
                <TextField
                  type="text"
                  value={host.surname}
                  onChange={this.onChangeSurname}
                  placeholder="Surname"
                  className="surname"
                />
                <TextField
                  type="text"
                  value={host.email}
                  onChange={this.onChangeEmail}
                  placeholder="Email"
                  className="email"
                />
                <TextField
                  className="eircode"
                  type="text"
                  value={host.eircode}
                  onChange={this.onChangeEircode}
                  placeholder="Eircode"
                />
                <TextField
                  className="telNo"
                  type="text"
                  value={host.telNo}
                  onChange={this.onChangeTelNo}
                  placeholder="Telephone number"
                />
                <FormGroup className="garda">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={host.gardaVettingStatus}
                        onChange={this.onGardaVettingStatusChange}
                        name="checkedA"
                      />
                    }
                    label="Garda Vetting Status"
                    color="primary"
                  />
                </FormGroup>
                <Button type="submit" variant="contained" color="primary">
                  Add Host
                </Button>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Hosts);
