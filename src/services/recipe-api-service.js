import config from '../config'

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
    postComment(recipeId, content) {
        return fetch(`${config.API_ENDPOINT}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
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
    }
}

export default RecipeApiService