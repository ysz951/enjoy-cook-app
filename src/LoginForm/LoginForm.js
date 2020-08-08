import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    console.log('login form submitted')
    console.log({ user_name, password })

    user_name.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  };

  render() {
    const { error } = this.state
    return (
      <section>
          <h2>login</h2>
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        {/* <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div> */}
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input
            className="user_name"
            name='user_name'
            id='LoginForm__user_name'
            required
          />
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            className="password"
            name='password'
            type='password'
            id='LoginForm__password'
            required
          />
        </div>
        <button type='submit'>
          Login
        </button>
        <Link to='/register'>Sign up</Link>
      </form>
    </section>
    );
  };
};
