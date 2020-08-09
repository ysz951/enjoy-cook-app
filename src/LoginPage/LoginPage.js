import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';
export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    // console.log(location)
    history.push(destination);
  };

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <Link to='/register'>Sign up</Link>
      </section>
    )
  }
}
