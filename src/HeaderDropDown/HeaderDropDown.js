import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import React, {useState, Fragment } from 'react';
import onClickOutside from 'react-onclickoutside';
import './HeaderDropDown.css';
function HeaderDropDown(props) {
    const [open, setOpen] = useState(false);
    const toggle =() => setOpen(!open);
    const {categories} = props;
    HeaderDropDown.handleClickOutside = () => setOpen(false);
    return (
        <div className="HeaderDropDown">
            <button 
                className="HeaderDropDown_bars"
                type="button" 
                onKeyPress={() => toggle(!open)} 
                onClick={() => toggle(!open)}
            >
                <FontAwesomeIcon icon='user'/> 
                {/* <span> Categories</span> */}
            </button>
            {open && (
            <div className="HeaderDropDown_menu">
                <Link
                    to='/users/collections'>
                    <FontAwesomeIcon icon='star' />
                    {' '}
                    Favorite
                </Link>   
                <Link
                    onClick={props.handleLogoutClick}
                    to='/'>
                        <FontAwesomeIcon icon='sign-out-alt' />
                        {' '}
                    Log out
                </Link>
            </div>
            )} 
        </div>
    );
}

HeaderDropDown.defaultProps = {
    handleLogoutClick: () => {},
}

const clickOutsideConfig = {
    handleClickOutside: () => HeaderDropDown.handleClickOutside,
};

export default onClickOutside(HeaderDropDown, clickOutsideConfig);