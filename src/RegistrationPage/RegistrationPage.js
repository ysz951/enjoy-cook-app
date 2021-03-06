import React, { Component } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './RegistrationPage.css';
export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/login');
  }
  render() {
    return (
      <section className='RegistrationPage'>
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}
