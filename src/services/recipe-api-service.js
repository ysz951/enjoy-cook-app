import config from '../config';
import TokenService from '../services/token-service';
import axios from 'axios';

const RecipeApiService = {
    getRecipes() {
        return fetch(`${config.API_ENDPOINT}/recipes`, {
        headers: {
        },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getRecipe(recipeId) {
        return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    upLoadImage(data) {
        return axios.post( `${config.API_ENDPOINT}/aws/profile-img-upload`, data, {
            headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
    },
    postRecipe(recipe_name, recipe_content, img_src, category_id) {
       
        return fetch(`${config.API_ENDPOINT}/recipes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            name: recipe_name,
            content: recipe_content,
            img_src,
            category_id,
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getCategories() {
        return fetch(`${config.API_ENDPOINT}/categories`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getCategoryRecipes(categoryId) {
        return fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getSearchRecipes(query) {
        return fetch(`${config.API_ENDPOINT}/search/${query}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getAuthorRecipes() {
        return fetch(`${config.API_ENDPOINT}/users/recipes`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    deleteAuthorRecipe(recipeId) {
        return fetch(`${config.API_ENDPOINT}/users/recipes/${recipeId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res => {
                if (!res.ok) {
                  return res.json().then(error => Promise.reject(error))
                }
            })
    },
    updateAuthorRecipe(recipe_name, recipe_content, img_src, category_id, recipeId){
        return fetch(`${config.API_ENDPOINT}/users/recipes/${recipeId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                name: recipe_name,
                content: recipe_content,
                img_src,
                category_id,
            }),
            })
            .then(res => {
                if (!res.ok) {
                  return res.json().then(error => Promise.reject(error))
                }
            })
        
    },
    getAuthorRecipe(recipeId) {
        return fetch(`${config.API_ENDPOINT}/users/recipes/${recipeId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    getRecipeComments(recipeId) {
        return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}/comments`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getCommentReply(commentId) {
        return fetch(`${config.API_ENDPOINT}/comments/replies/${commentId}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postComment(recipeId, content) {
        return fetch(`${config.API_ENDPOINT}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            recipe_id: recipeId,
            content,
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    deleteComment(commentId) {
        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    updateComment(recipeId, content, commentId) {
        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            recipe_id: recipeId,
            content,
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    getCollectionRecipes() {
        return fetch(`${config.API_ENDPOINT}/users/collections/recipes`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    getCollectionList() {
        return fetch(`${config.API_ENDPOINT}/users/collections/recipe_set`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    postCollectionList(recId) {
        return fetch(`${config.API_ENDPOINT}/users/collections/recipe_set`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                rec_id: recId,
            }),
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    deleteCollectionList(recId) {
        return fetch(`${config.API_ENDPOINT}/users/collections/recipe_set/${recId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res => {
                if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
                }
            })
    },
};

export default RecipeApiService;
