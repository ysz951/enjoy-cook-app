import React, { Component } from 'react';
import './UploadImage.css';
import RecipeApiService from '../services/recipe-api-service';
import RecipeListContext from '../context/RecipeListContext';
export default class UploadImage extends Component {
    static defaultProps = {
        history: {
          push: () => {},
        }
    };
    static contextType = RecipeListContext;
    state = {
        selectedFile: null,
        img_src: null,
        display_img:null,
    };

    componentDidMount() {
        this.context.clearError();
        RecipeApiService.getCategories()
            .then(this.context.setCategoryList)
            .catch(this.context.setError)
    }
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
        const data = new FormData();
        const category_id = ev.target['Publish__categoryId'].value || null;
        // If file selected
        if ( this.state.selectedFile ) {
            data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name);
            RecipeApiService.upLoadImage(data)
                .then(response=> {
                    if ( 200 === response.status ) {
                        // If file size is larger than expected.
                        if( response.data.error ) {
                            if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                                this.context.setError('Max size: 2MB');
                            } 
                            else {
                                // If not the given file type
                                this.context.setError(response.data.error);
                            }
                        } 
                        else {
                            // Success
                            let fileName = response.data;
                            this.setState({img_src: fileName.location})
                            return RecipeApiService.postRecipe(
                                recipe_name.value, 
                                recipe_content.value, 
                                this.state.img_src, 
                                category_id
                            )
                        }
                    }
                })
                .then(recipe => {
                    if (recipe) {
                        this.context.addRecipe(recipe);
                        this.props.history.push('/main')
                    }
                })
                .catch(this.context.setError);
        } 
        else {
        // if file not selected throw error
            this.context.setError('Please upload file');
        }
    };
    imagePart = () => {
        const {error} = this.context;
        return (
            <div className="container">
                <div role='alert'>
                {error && <p className='red'>{error}</p>}
                </div>
                {/* Single File Upload*/}
                <div>
                    <div>
                        
                        <p className="text-muted">
                            Upload Size: 250px x 250px ( Max 2MB )
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            Please upload an image for your profile
                            <span className='Required red'>
                                &#42;
                            </span>  
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
        const {categoryList = []} = this.context;
        return(
        <section className="Publish_section">
            <h2 className="Publish_titie">
                Upload your recipe
            </h2>
            <form
                className='Publish_form'
                onSubmit={this.singleFileUploadHandler}
            >
                {this.imagePart()}
                
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
                <textarea
                    required
                    name='recipe_content'
                    id='Publish__recipeContent'
                    rows='3'
                />
                
                </div>
                <div className='field'>
                    <label htmlFor='category_select'>
                        Category
                    </label>
                    <select id='category_select' name='Publish__categoryId'>
                    <option value="">...</option>
                    {categoryList.map(category =>{
                        return (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        )
                        }
                    )}
                    </select>
                </div> 
                <div className="btn-div">
                    <button 
                        className="btn btn-info"
                        disabled={!this.state.selectedFile} 
                        type='submit'
                    >
                        Upload!
                    </button>
                </div>
            </form>
        </section>
        );
    }
}
