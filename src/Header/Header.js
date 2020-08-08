import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <nav className='Header__name'>
        <h1>
          <Link to='/'>
            <FontAwesomeIcon icon='drumstick-bite' />
            {' '}
            Enjoy Cook
          </Link>
        </h1>
        <div className='Header__not-logged-in'>
            {/* <Link
                to='/register'>
                Register
            </Link> */}
            <Link
                to='/login'>
                Log in
            </Link>
        </div>
      </nav>
    );
  };
};
