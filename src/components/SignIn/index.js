import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Col, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './SignIn.css';

const SignInPage = () => (
  <div>
    <Card>
      <Card.Header>
        <Card.Title as="h5">Language School Management System Sign In</Card.Title>
      </Card.Header>
      <Card.Body>
        <SignInForm />
        <PasswordForgetLink />
      </Card.Body>
    </Card>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = 'This email cannot be used to signup';

const ERROR_CODE_USER_NOT_FOUND =
  'auth/user-not-found';

const ERROR_MSG_INVALID_CREDENTIALS = `
  Username or Password was invalid
`;

const ERROR_CODE_WRONG_PASSWORD =
  'auth/wrong-password';


class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_USER_NOT_FOUND || error.code === ERROR_CODE_WRONG_PASSWORD) {
          error.message = ERROR_MSG_INVALID_CREDENTIALS;
        } 

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-form">
          <TextField
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button disabled={isInvalid} type="submit" variant="contained" color="primary">
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
