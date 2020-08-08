import React, { Component } from 'react';
import './AddFolder.css'
import FolderNoteContext from '../FolderNoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import {validateName, formatName, isAlpha} from '../ValidationHelper';
import config from '../config';

class AddFolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      nameRep: false
    };
    this.name = React.createRef();
  }
    
    static propTypes = {
        history: PropTypes.shape({
          goBack: PropTypes.func,
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

    handleSubmit = e =>{
        e.preventDefault();
        const {name} = this.state;
        const folderName = formatName(name.value)
        for (let folder of this.context.folders){
            if (folder.name === folderName ){
              this.setState(this.name.current.focus());
              this.setState({nameRep: true})
              return
            }
        }
        const folder = {
            name: folderName,
        };
        

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
              }
              return res.json()
            })
            .then(data => {
              this.context.handleAddFolder(data);
              this.props.history.goBack();
            })
            .catch(error => {
              alert("Something went wrong, please try again later.")
            })
    }
    render(){
        const {history} = this.props;
        const nameError = validateName;
        const alphaCheck = isAlpha;
        const nameRep = this.state.nameRep ? <p className="error">This folder name has already been used. Try another name.</p> : "";
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
                <h2>Add a folder</h2>
                <form className="addFolderForm" onSubmit={this.handleSubmit}>
                    <div className="nameGroup">
                        <label htmlFor="name">Name</label>
                        <input  type="text" 
                                className="folderNameInput"
                                name="name" 
                                id="name" 
                                ref={this.name}
                                aria-label="Name"
                                aria-required="true"
                                aria-describedby="folderNameError"
                                aria-invalid={this.state.nameRep}
                                required
                                onChange={e => this.updateName(e.target.value)}
                        />
                    </div>
                    {this.state.name.touched && (
                        <ValidationError 
                          id="folderNameError" 
                          message={nameError(this.state.name.value, alphaCheck)} 
                        />
                    )}
                    {nameRep}
                    <div className="submitGroup">
                        <button type="submit" disabled={nameError(this.state.name.value, alphaCheck)}>
                            OK
                        </button>
                    </div>
                    </form>
                </main>
                </>
   )
 }
}

export default AddFolder;
