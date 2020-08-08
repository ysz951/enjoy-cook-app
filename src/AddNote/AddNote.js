import React, { Component } from 'react';
import './AddNote.css'
import FolderNoteContext from '../FolderNoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import {validateName, isAlpha, formatName} from '../ValidationHelper';
import config from '../config';

class AddNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: "",
                touched: false
            },
            content: {
                value: "",
                touched: false
            },
            nameRep: false
        };
        this.name = React.createRef();
    }
    
    static propTypes = {
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
    };
    static defaultProps = {
        history: {}
    };

    static contextType = FolderNoteContext;
    

    updateName(name){
        this.setState({
            name: {value: name, touched: true},
            nameRep: false,
        });
    }

    updateContent(content){
        this.setState({content: {value: content, touched: true}});
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {name} = this.state;
        const folderId = e.target['note-folder-id'].value;
        const noteName = formatName(name.value);

        for (let note of this.context.notes){
            if (note.name === noteName && note.folderId === Number(folderId) ){
                this.setState(
                    this.name.current.focus(),
                );
                this.setState({
                    nameRep: true
                })
                return
            }
        }
        const newNote = {
            name: noteName,
            content: this.state.content.value,
            folderId: folderId ,
            modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify(newNote),
            })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(note => {
              note.modified = note.modified.slice(0,10)
              this.context.addNote(note)
              this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
                alert("Something went wrong, please try again later.")
            })
        
    }
    render(){
        const {history} = this.props;
        const {folders} = this.context;
        const nameError = validateName;
        const alphaCheck = isAlpha;
        const nameRep = this.state.nameRep? <p className="error">This note name has already been used in this folder. Try another name or folder.</p> : "";
         return (
            <>
            <nav className="mainContentLeft addFolderNav">
            <button 
                className="goBackBtn" 
                onClick={() => history.goBack()}
                type='button'
            >
                <FontAwesomeIcon icon={faChevronLeft}/>
                <span> BACK</span>
            </button>
            </nav>
            <main className="mainContentRight">
                <h2>Add a note</h2>
                <form className="addNoteForm" onSubmit={this.handleSubmit}>
                    <div className="nameGroup">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            className="folderNameInput"
                            ref={this.name}
                            name="name" 
                            id="name"
                            aria-label="Name"
                            aria-required="true"
                            aria-describedby="noteNameError"
                            aria-invalid={this.state.nameRep} 
                            required
                            onChange={e => this.updateName(e.target.value)}
                        />
                    </div>
                    {this.state.name.touched && (
                        <ValidationError id="noteNameError" message={nameError(this.state.name.value, alphaCheck)} />
                    )}
                    {nameRep}
                    <div className="contentGroup">
                        <label htmlFor="content">Content</label>
                        <textarea 
                            type="text" 
                            className="folderNameInput" 
                            rows="4"
                            name="content" 
                            id="content" 
                            aria-label="Content"
                            aria-required="true"
                            aria-describedby="folderContentError"
                            aria-invalid="false"
                            onKeyUp={e => this.updateContent(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id' required>
                        <option value="">...</option>
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                            {folder.name}
                            </option>
                        )}
                        </select>
                    </div>
                    <div className="submitGroup">
                        <button 
                            type="submit"
                            disabled={nameError(this.state.name.value, alphaCheck)} 
                        >
                            OK
                        </button>
                    </div>
                    </form>
                </main>
                </>
   )
 }
}

export default AddNote;
