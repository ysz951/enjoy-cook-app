import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import './LoginPage.css';
export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || window.localStorage.pathname || '/main';
    history.push(destination);
  };

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <p>
          <span>Don't have an acount? </span>
          <Link className="LoginPage_Sign_up" to='/register'>Sign up</Link>
        </p>
      </section>
    );
  }
}
