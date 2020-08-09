import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryLink.css'
export default function CategoryLink() {
    return (
        <div className="Category__link">
            <NavLink exact to='/' activeClassName="selected">
                all
            </NavLink>
            {' '}
            <NavLink to='/category/1' activeClassName="selected">
                Breakfast
            </NavLink>
            {' '}
            <NavLink to='/category/2' activeClassName="selected">
                Lunch
            </NavLink>
        </div>
    )
}