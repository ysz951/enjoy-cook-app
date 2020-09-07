import React, { Component } from 'react';
import $ from 'jquery';
import './UploadImage.css';
import RecipeApiService from '../services/recipe-api-service';
import RecipeListContext from '../context/RecipeListContext';
export default class UploadImage extends Component {
    static contextType = RecipeListContext;
    state = {
        selectedFile: null,
        img_src: null,
        display_img:null,
    };

    singleFileChangedHandler = ( event ) => {
        this.setState({
            selectedFile: event.target.files[0],
            display_img: 
            event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null,
        });
    };
    singleFileUploadHandler = (ev) => {
        ev.preventDefault();
        const {recipe_name, recipe_content} = ev.target;
        // const {user_id} = TokenService.readJwtToken();
        const data = new FormData();
        const category_id = 1;
        // If file selected
        if ( this.state.selectedFile ) {
            data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name);
            RecipeApiService.upLoadImage(data)
                .then(response=> {
                    if ( 200 === response.status ) {
                        // If file size is larger than expected.
                        if( response.data.error ) {
                            if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                                this.ocShowAlert( 'Max size: 2MB', 'red' );
                            } 
                            else {
                                console.log( response.data );
                                // If not the given file type
                                this.ocShowAlert( response.data.error, 'red' );
                            }
                        } 
                        else {
                            // Success
                            let fileName = response.data;
                            this.setState({img_src: fileName.location})
                            // console.log( 'fileName', fileName );
                            console.log(typeof this.state.img_src);
                            this.ocShowAlert( 'File Uploaded', '#3089cf' );
                            RecipeApiService.postRecipe(
                                recipe_name.value, 
                                recipe_content.value, 
                                this.state.img_src, 
                                category_id
                            )
                            .then(recipe => {
                                this.context.addRecipe(recipe);
                                this.props.history.push('/main')
                            })
                            .catch(this.context.setError)
                        }
                    }
                })
                .catch( ( error ) => {
                    // If another error
                    this.ocShowAlert( error, 'red' );
                });
        } 
        else {
        // if file not selected throw error
            this.ocShowAlert( 'Please upload file', 'red' );
        }
    };
    // ShowAlert Function
    ocShowAlert = ( message, background = '#3089cf' ) => {
        let alertContainer = document.querySelector( '#oc-alert-container' ),
        alertEl = document.createElement( 'div' ),
        textNode = document.createTextNode( message );
        alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
        $( alertEl ).css( 'background', background );
        alertEl.appendChild( textNode );
        alertContainer.appendChild( alertEl );
        setTimeout( function () {
        $( alertEl ).fadeOut( 'slow' );
        $( alertEl ).remove();
        }, 3000 );
    };

    imagePart = () => {
        return (
            <div className="container">
                {/* For Alert box*/}
                <div id="oc-alert-container"></div>
                {/* Single File Upload*/}
                <div className="card border-light mb-3 mt-5">
                    <div className="card-header">
                        <h3 style={{ color: '#555', marginLeft: '12px' }}>
                            Single Image Upload
                        </h3>
                        <p className="text-muted" style={{ marginLeft: '12px' }}>
                            Upload Size: 250px x 250px ( Max 2MB )
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            Please upload an image for your profile
                        </p>
                        <input type="file" onChange={this.singleFileChangedHandler}/>
                        <div className="fix250Square"> 
                        { this.state.display_img ? <img src={this.state.display_img} alt=""/> : ''}
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }

    render() {
        
        return(
            
        <section className="Publish_section">
            <form
                className='RegistrationForm'
                onSubmit={this.singleFileUploadHandler}
            >
                {this.imagePart()}
                {/* <div role='alert'>
                {error && <p className='red'>{error}</p>}
                </div> */}
                <div className='recipe_name'>
                <label htmlFor='Publish__recipeName'>
                    Recipe name
                    <span className='Required red'>
                    &#42;
                    </span>  
                </label>
                <input
                    name='recipe_name'
                    type='text'
                    required
                    id='Publish__recipeName'/>
                
                </div>
                <div className='password'>
                <label htmlFor='Publish__recipeContent'>
                    Recipe Content
                    <span className='Required red'>
                    &#42;
                    </span> 
                </label>
                <input
                    name='recipe_content'
                    type='text'
                    required
                    id='Publish__recipeContent'/>
                
                </div>
                <div className="mt-5">
                            <button 
                                className="btn btn-info"
                                disabled={!this.state.selectedFile} 
                                type='submit'
                            >
                                Upload!
                            </button>
                        </div>
                {/* <button className="RegistrationForm_submit_btn btn_type_1" type='submit'>
                Go
                </button> */}
            </form>
        </section>
        );
    }
}
