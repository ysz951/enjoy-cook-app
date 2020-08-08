import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import SideBarList from '../SideBarList/SideBarList';
import SideBarSelectedList from '../SideBarSelectedList/SideBarSelectedList';
import MainNoteList from '../MainNoteList/MainNoteList';
import MainNoteSelectedList from '../MainNoteSelectedList/MainNoteSelectedList';
import FolderNoteContext from '../FolderNoteContext';
import './MainContent.css';
import ComponentError from '../ComponentError';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import EditNote from '../EditNote/EditNote'
import EditFolder from '../EditFolder/EditFolder'
class MainContent extends Component {
    static contextType = FolderNoteContext;
    render(){
        const {folders, notes} = this.context;
        return (  
            <div className='mainContent'>
                <Route
                    exact
                    path='/'
                    render={(routerProps) => {
                        return (
                            <>
                            <ComponentError sec="Folder List">
                                <SideBarList folderId="" history={routerProps.history}/>
                            </ComponentError>
                            <ComponentError sec="Note List">
                                <MainNoteList folderId="" history={routerProps.history}/>
                            </ComponentError>
                            </>
                        )
                    }}
                />
                <Route
                    path='/folder/:folderId'
                    render={(routerProps) => {
                        return (
                            <>  
                                <ComponentError sec="Selected Folder List">
                                    <SideBarList folderId={routerProps.match.params.folderId} history={routerProps.history}/>
                                </ComponentError>
                                <ComponentError sec="Selected Folder-Note List">
                                    <MainNoteList folderId={routerProps.match.params.folderId} history={routerProps.history}/>
                                </ComponentError>
                            </>
                        )
                    }}
                />
                <Route
                    path='/note/:noteId'
                    render={(routerProps) => {
                        const note= notes.find(item => item.id === Number(routerProps.match.params.noteId)) || {};
                        const folder = folders.find(item => item.id === note.folderId) || {};
                        return (
                            <>
                                <ComponentError sec="Selected Note-Folder">
                                    <SideBarSelectedList folder = {folder}  history = {routerProps.history}/>
                                </ComponentError>
                                <ComponentError sec="Selected Note">
                                    <MainNoteSelectedList 
                                        note = {note} 
                                        history = {routerProps.history}
                                    />
                                </ComponentError>
                            </>
                        )
                    }}
                />
                <Route
                    path='/add-folder'
                    render={(routerProps) => 
                        <ComponentError sec="Add Folder">
                            <AddFolder history={routerProps.history}/>
                        </ComponentError>
                    }
                />
                <Route
                    path='/add-note'
                    render={(routerProps) => 
                        <ComponentError sec="Add Note">
                            <AddNote history={routerProps.history}/>
                        </ComponentError>
                    }
                />
                <Route
                    path='/edit-note/:noteId'
                    render={(routerProps) => 
                        {
                            const note= notes.find(item => item.id === Number(routerProps.match.params.noteId)) || {};
                            return (
                                <ComponentError sec="Edit Note">
                                    <EditNote
                                        history = {routerProps.history} 
                                        noteId = {routerProps.match.params.noteId}
                                        folderId = {note.folderId}
                                    />
                                </ComponentError>
                            )
                        }
                    }
                />
                <Route
                    path='/edit-folder/:folderId'
                    render={(routerProps) => 
                        <ComponentError sec="Edit Folder">
                            <EditFolder
                                history = {routerProps.history} 
                                folderId = {routerProps.match.params.folderId}
                            />
                        </ComponentError> 
                    }
                />
            </div>
        );
    }
}

export default MainContent;
