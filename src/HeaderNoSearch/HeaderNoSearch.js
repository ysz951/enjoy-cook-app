import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import CollectionListContext from '../context/CollectionListContext';
import HeaderDropDown from '../HeaderDropDown/HeaderDropDown'
import './HeaderNoSearch.css';

class HeaderNoSearch extends Component {
  static contextType = CollectionListContext;
  handleLogoutClick = () => {
    this.context.clearCollectionList();
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }

  renderLogoutLink() {
    const userName = TokenService.readJwtToken().sub;
    
    return (
      <div className="dropdown">
        <p className="dropdown-userName"> {userName} </p>
        <button className="dropbtn">
            {/* {userName} */}
            <FontAwesomeIcon icon='user' />
        </button>
        <div className="dropdown-content">
            <Link
            to ="/users/publish">
                Publish
                {' '}
            <FontAwesomeIcon icon='file-alt' />
            </Link>
            <Link
            to='/users/collections'>
                Favorite
                {' '}
            <FontAwesomeIcon icon='star' /> 
            </Link>
            <Link
                to='/'
                onClick={this.handleLogoutClick}
            >
                Log out
                {' '}
                <FontAwesomeIcon icon='sign-out-alt' />
                
            
            </Link>
        </div>
      </div>

      // <HeaderDropDown handleLogoutClick={this.handleLogoutClick}/>
    //   <div className='Header__log_part'>
    //     <Link
    //       to ="/users/publish">
    //       Publish
    //     </Link>
    //     {' '}
    //     <Link
    //       to='/users/collections'>
    //       <FontAwesomeIcon icon='star' />
    //       {' '}
    //       Favorite
    //     </Link>
    //     {' '}
    //     <Link
    //       onClick={this.handleLogoutClick}
    //       to='/'>
    //         <FontAwesomeIcon icon='sign-out-alt' />
    //         {' '}
    //       Log out
    //     </Link>
    //   </div>
    );
  }

  renderLoginLink() {
    return (
      <div className='Header__log_part'>
        <Link
          to ="/users/publish">
          Publish
        </Link>
        {' '}
        <Link
          to='/users/collections'>
          <FontAwesomeIcon icon='star' />
          {' '}
          Favorite
        </Link>
        {' '}
        <Link
          to='/login'>
            <FontAwesomeIcon icon='sign-in-alt' />
            {' '}
          Log in
        </Link>
      </div>
    );
  }
  render() {
    return (
      <>
      <nav className='Header__name'>
        <h1 className="Header_app_name">
          <Link to='/main'>
            <FontAwesomeIcon className="red" icon='drumstick-bite' />
            {' '}
            <span className="brown">Enjoy</span> <span className="orange">Cook</span>
          </Link>
        </h1>
        
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
      </>
    );
  }
}

export default withRouter(HeaderNoSearch);