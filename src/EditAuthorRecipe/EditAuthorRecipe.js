import React, { Component } from 'react';
import $ from 'jquery';
// import './UploadImage.css';
import RecipeApiService from '../services/recipe-api-service';
import RecipeListContext from '../context/RecipeListContext';
export default class EditAuthorRecipe extends Component {
    static contextType = RecipeListContext;
    state = {
        selectedFile: null,
        img_src: null,
        display_img:null,
        recipeName: "",
        recipeContent: "",
        categoryId: null,
    };

    componentDidMount() {
        this.context.clearError();
        const {recipeId} = this.props.match.params;
        Promise.all([RecipeApiService.getCategories(), RecipeApiService.getAuthorRecipe(recipeId)])
            .then(([cateRes, recRes]) => {
                this.context.setCategoryList(cateRes);
                this.setState({
                    img_src: recRes.img_src,
                    display_img: recRes.img_src,
                    recipeName: recRes.name,
                    recipeContent: recRes.content,
                    categoryId: recRes.category_id,
                })
            })
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
        const {recipeId} = this.props.match.params;
        const data = new FormData();
        const category_id = ev.target['Publish__categoryId'].value || null;
        this.context.clearError();
        if ( this.state.selectedFile ) {
            data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name);
            RecipeApiService.upLoadImage(data)
                .then(response=> {
                    if ( 200 === response.status ) {
                        // If file size is larger than expected.
                        if( response.data.error ) {
                            if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                                this.context.setError('Max size: 2MB')
                            } 
                            else {
                                // If not the given file type
                                this.context.setError(response.data.error)
                            }
                        } 
                        else {
                            // Success
                            let fileName = response.data;
                            this.setState({img_src: fileName.location})
                            RecipeApiService.updateAuthorRecipe(
                                recipe_name.value, 
                                recipe_content.value, 
                                this.state.img_src, 
                                category_id,
                                recipeId,
                            )
                            .then(() => {this.props.history.push('/main')})
                            .catch( this.context.setError);
                        }
                    }
                })
                .catch( this.context.setError);
        }
        else if (this.state.img_src) {
            RecipeApiService.updateAuthorRecipe(
                recipe_name.value, 
                recipe_content.value, 
                this.state.img_src, 
                category_id,
                recipeId,
            )
            .then(() => {{this.props.history.push('/main')}})
            .catch( this.context.setError);
        }
        else {
        // if file not selected throw error
            this.context.setError('Please upload file')
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
                            <span className='Required red'>
                                &#42;
                            </span>  
                        </p>
                        <input type="file" onChange={this.singleFileChangedHandler} />
                        <div className="fix250Square"> 
                        { this.state.display_img ? 
                            <img src={this.state.display_img} alt=""/> 
                            :
                            <img src={this.state.img_src} alt=""/>}
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
            <form
                className='RegistrationForm'
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
                    id='Publish__recipeName'
                    defaultValue = {this.state.recipeName}
                />
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
                    id='Publish__recipeContent'
                    defaultValue = {this.state.recipeContent}
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
                            category.id === this.state.categoryId ?
                                <option key={category.id} value={category.id} selected>
                                {category.name}
                                </option>  :
                                <option key={category.id} value={category.id}>
                                {category.name}
                                </option>
                        )
                        }
                    )}
                    </select>
                </div> 
                <div className="mt-5">
                    <button 
                        className="btn btn-info"
                        // disabled={!this.state.selectedFile} 
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
