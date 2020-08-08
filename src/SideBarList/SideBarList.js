import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SideBarList.css'
import {Link } from 'react-router-dom';
import FolderNoteContext from '../FolderNoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

class SideBarList extends Component {
    static defaultProps = {
        history: {},
        folderId: "",
    };
    static propTypes ={
        folderId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func,
          }).isRequired,
    }
    static contextType = FolderNoteContext;
    render(){
        const { folderId, history } = this.props;
        const { folders, deleteFolder } = this.context;
        return (
            <nav className="sideBar mainContentLeft">
                <ul className="sideBarList">
                    {folders.map((folder, i) =>  {
                        return folder.id === Number(folderId) ? 
                        <li key = {i} className="sideBarSelectedItem">
                            <div className="folderGroup">
                                <button 
                                    className="folderControl" 
                                    onClick={() => deleteFolder(folder.id)}
                                    type='button'
                                >
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                                <p className="folderName">{folder.name}</p>
                                <button 
                                    className="folderControl" 
                                    onClick={() => {history.push(`/edit-folder/${folder.id}`)}}
                                    type='button'
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                            </div>
                        </li> :
                        <li key = {i} className="sideBarItem">
                            <div className="folderGroup">
                                <button 
                                    className="folderControl" 
                                    onClick={() => deleteFolder(folder.id)}
                                    type='button'
                                >
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                                <Link className="folderName" to={`/folder/${folder.id}`}>
                                    {folder.name}
                                </Link>
                                <button 
                                    className="folderControl" 
                                    onClick={() => {history.push(`/edit-folder/${folder.id}`)}}
                                    type='button'
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                            </div>
                        </li>
                    })
                    }
                </ul>
                <button className="addFolder" type="button" onClick={() => history.push("/add-folder")}>
                    <FontAwesomeIcon className="addFolderIcon"icon={faPlus}/>
                    <br/>
                    <span>Folder</span>
                </button>
                
            </nav>
        );
    }
}

export default SideBarList;
