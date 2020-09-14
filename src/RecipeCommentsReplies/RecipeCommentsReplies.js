import React, { Component } from 'react';
import RecipeContext  from '../context/RecipeContext';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
import './RecipeCommentsReplies.css';

export default class RecipeCommentsReplies extends Component {

  state = {
    comment: null,
  };
  static defaultProps = {
    updateCommentNumber: () => {},
  };
  
  static contextType = RecipeContext;
  componentDidMount() {
    // const { recipeId } = this.props;
    const {commentId} = this.props;
    this.context.clearError();
    RecipeApiService.getCommentReply(commentId)
      .then(comment => {
        //   console.log(comment)
          this.setState({comment: comment})
        //   if (res) {
        //     RecipeApiService.getCommentReply(res.id)
        //         .then(res => {
        //             console.log(res)
        //         })
        //         .catch(this.context.setError)
        //   }     
      })
      .catch(this.context.setError)
  }

  render() {
    const user_id = TokenService.hasAuthToken() ? TokenService.readJwtToken().user_id : null;
    // const { comments = [], error } = this.context;
    const {comment} = this.state;

    return (
        <div className="RecipePage__comment_reply">
        <div role='alert'>
            
          {/* {error && <p className='red'>{error}</p>} */}
        </div>
        {comment &&
            <> 
            <div className="Reply_item">
             <p>{comment.user.user_name}</p>
             {comment.user.id === user_id 
                ? !this.props.textAreaActive && !this.props.selectedCommentId 
                ? this.props.manipulateCommentButton(comment)
                : comment.id !== this.props.selectedCommentId && this.props.textAreaActive 
                ? this.props.manipulateCommentButton(comment)
                : ''
                : ''}
            </div>
            { this.props.commentContentArea(comment, user_id)}
            {/* <p className="Crimson">{comment.content}</p> */}
            </>
        }
        
      </div>
  )};
}
