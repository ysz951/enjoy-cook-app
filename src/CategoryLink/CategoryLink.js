import React, {useState, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
  
function CategoryLink(props) {

    const [open, setOpen] = useState(false)
    const toggle =() => setOpen(!open)
    const {categories} = props
    CategoryLink.handleClickOutside = () => setOpen(false);
    return (
        <div className="Categorylink">
            <p type="button" onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
            select 
            </p>
        
            {open && (
            <div className="Categorylink_menu">
                <NavLink key="all" exact to='/' activeClassName="selected">
                All
                </NavLink>     
                {categories.map(categorie => 
                <Fragment key={categorie.id}>
                    <span> </span>
                    <NavLink exact to={`/category/${categorie.id}`} activeClassName="selected">
                    {categorie.name}
                    </NavLink>
                </Fragment>
                )}
            </div>
            )} 
        </div>
    )
}
const clickOutsideConfig = {
    handleClickOutside: () => CategoryLink.handleClickOutside,
}

export default onClickOutside(CategoryLink, clickOutsideConfig);