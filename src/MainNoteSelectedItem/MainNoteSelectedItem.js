import React from 'react';
import './MainNoteSelectedItem.css'
import PropTypes from 'prop-types';
import FolderNoteContext from '../FolderNoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
function MainNoteSelectedItem(props){
    const { note, history }=props;
        return(
            <FolderNoteContext.Consumer>
                {(context) => {
                    const {deleteNote} = context
                    return (
                        <li className="mainNoteItem">
                            <div className="Note"> 
                                <h2 className="noteName">
                                    {note.name}
                                </h2>
                                <button
                                    className = "editNoteBtn" 
                                    onClick={() => {
                                        history.push(`/edit-note/${note.id}`)
                                    }}
                                    type='button'
                                >
                                    <FontAwesomeIcon icon={faEdit}/>
                                </button>
                                
                                <p>Modified <span>&ensp;</span> <span>{note.modified}</span></p>
                            </div>
                            <div className="Delete">
                                <button 
                                    onClick={() => {
                                        history.goBack();
                                        deleteNote(note.id);
                                    }}
                                    type='button'
                                >
                                    <FontAwesomeIcon className="deleteIcon"icon={faTrashAlt}/>
                                    <span> Delete</span>
                                </button>
                            </div>
                        </li>
                    );
                }}
            </FolderNoteContext.Consumer>
        )
}
MainNoteSelectedItem.defaultProps = {
    note: {},
    history: {},
};

MainNoteSelectedItem.propTypes ={
    history: PropTypes.shape({
        goBack: PropTypes.func,
        push: PropTypes.func,
    }).isRequired,
    note: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        modified: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
    }).isRequired,
};
export default MainNoteSelectedItem;
