import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainNoteItem from '../MainNoteItem/MainNoteItem'
import './MainNoteList.css'
import FolderNoteContext from '../FolderNoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
class MainNoteList extends Component {
    static defaultProps = {
        history: {},
    };
    static propTypes ={
        folderId: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func,
            goBack: PropTypes.func,
          }).isRequired,
    }
    static contextType = FolderNoteContext;
    render(){
        const {folderId, history} = this.props;
        const {notes} = this.context;
        
        return (
            <main className="mainNote mainContentRight">
                <ul className="mainNoteList">
                    {notes.map((note,i) => {
                        return folderId ? 
                        note.folderId === Number(folderId) ? 
                        <MainNoteItem key={i} note={note} history = {history}/> : 
                        "" : 
                        <MainNoteItem key={i} note={note} history = {history}/>
                    })}
                </ul>
                <button className="addNote" type="button" onClick={() => history.push("/add-note")}>
                    <FontAwesomeIcon className="addNoteIcon"icon={faPlus }/>
                    <br/>
                    <span>Note</span>
                </button>
            </main>
        );
    }
}

export default MainNoteList;
