import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import './SideBarSelectedList.css'
class SideBarSelectedList extends Component {
    static defaultProps = {
        folder: {},
        history: {},
    };
    static propTypes ={
        history: PropTypes.shape({
            goBack: PropTypes.func,
        }).isRequired,
        folder: PropTypes.shape({
            name: PropTypes.string,
        }).isRequired,
    }
    render(){
        const {folder, history} = this.props;
        return (
            <nav className="sideBar mainContentLeft">
                <ul className="sideBarList">
                        
                    <li className="sideBarSelectedItem">
                        <div className="folderGroup">
                            <p className="selectedFolderName">{folder.name}</p>
                            <button 
                                className="folderControl" 
                                onClick={() => {history.push(`/edit-folder/${folder.id}`)}}
                                type='button'
                            >
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="goBack">
                    
                    <button 
                        className="goBackBtn" 
                        onClick={() => history.goBack()}
                        type='button'
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span> BACK</span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default SideBarSelectedList;
