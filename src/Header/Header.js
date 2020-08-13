import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import RecipeContext from '../context/RecipeContext'
import './Header.css'

class Header extends Component {
  static contextType = RecipeContext
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }
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
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)