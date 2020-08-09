import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchNav.css'
export default class SearchNav extends Component {
    state = { search: "" };
    
    updateName(search){
        this.setState({search});
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.search);
    };
    render() {
        
    return (
      <div className="SearchNav">
        <CategoryLink />
        <form className="SearchNav__form" onSubmit={this.handleSubmit}>
          <input
            placeholder="search"
            onKeyUp={e => this.updateName(e.target.value)}
            type="text"
          />
          <button type="submit">search</button>
        </form>
      </div>
    );
  };
};
function CategoryLink() {
  return (
      <div className="Categorylink">
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
  );
};