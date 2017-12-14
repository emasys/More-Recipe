import axios from 'axios';


const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');


// Fetch All recipes
export const getRecipes = (page, query = '') => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/page/${page}${query}`)
      .then((response) => {
        dispatch({ type: 'RECIPES', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Get a single recipe
export const getRecipeItem = (id) => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'RECIPES_ITEM', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Get user specific recipes
export const getUserRecipes = (limit, id) => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/yours/${limit}/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'USER_RECIPES', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Get a specific user
export const getUserInfo = (id) => {
  return (dispatch) => {
    return axios.get(`${URL}/users/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'USER_INFO', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// user profile
export const getProfile = (id) => {
  return (dispatch) => {
    return axios.get(`${URL}/users/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'USER_PROFILE', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios.delete(`${URL}/users/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'DELETE_USER', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// fetch all users
export const getAllUsers = () => {
  return (dispatch) => {
    return axios.get(`${URL}/users?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'ALL_USERS', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Get user favorites
export const getFavs = () => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/fav?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'GET_FAVORITES', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


// Get recipe category
export const getCategory = (data, limit) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes/category/${limit}?token=${xtoken}`, data)
      .then((response) => {
        dispatch({ type: 'GET_CATEGORY', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// edit recipe
export const editRecipe = (data, id) => {
  return (dispatch) => {
    return axios.put(`${URL}/recipes/${id}?token=${xtoken}`, data)
      .then((response) => {
        dispatch({ type: 'EDIT_RECIPE', payload: response.data });
      });
  };
};

// Create a new user
export const signUp = (data) => {
  return (dispatch) => {
    return axios.post(`${URL}/users/signup`, data)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        const jwtbug = window.localStorage.getItem('token');
        if (jwtbug.length > 9) {
          return dispatch({ type: 'SIGN_UP', payload: response.data });
        }
        window.localStorage.removeItem('token');
        dispatch({ type: 'SIGN_UP', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'SIGN_UP', payload: err.response.data });
      });
  };
};

// Login
export const signIn = (data) => {
  return (dispatch) => {
    console.log(data);
    return axios.post(`${URL}/users/signin`, data)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        const jwtbug = window.localStorage.getItem('token');
        if (jwtbug.length > 9) {
          return dispatch({ type: 'SIGN_IN', payload: response.data });
        }
        window.localStorage.removeItem('token');
        dispatch({ type: 'SIGN_IN', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'SIGN_IN', payload: err.response.data });
      });
  };
};

// Post a review
export const postReview = (data, id) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes/${id}/reviews?token=${xtoken}`, data)
      .then((response) => {
        dispatch({ type: 'REVIEW', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'REVIEW', payload: err.response });
      });
  };
};

export const searchRecipes = (data) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipeSearch`, data)
      .then((response) => {
        dispatch({ type: 'SEARCH', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'SEARCH', payload: err.response });
      });
  };
};


// Add a recipe
export const addRecipe = (data) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes?token=${xtoken}`, data)
      .then((response) => {
        dispatch({ type: 'NEW_RECIPE', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'NEW_RECIPE', payload: err.response });
      });
  };
};

// Add Favorite
export const setFavorite = (id) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes/${id}/fav?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'SET_FAVORITE', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'SET_FAVORITE', payload: err.response });
      });
  };
};

// Delete Recipe
export const delRecipe = (id) => {
  return (dispatch) => {
    return axios.delete(`${URL}/recipes/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'DELETE_RECIPE', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_RECIPE', payload: err.response });
      });
  };
};

// upvote
export const upvote = (id) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes/upvote/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'UPVOTE', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'UPVOTE', payload: err.response });
      });
  };
};

// downvote
export const downvote = (id) => {
  return (dispatch) => {
    return axios.post(`${URL}/recipes/downvote/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'DOWNVOTE', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'DOWNVOTE', payload: err.response });
      });
  };
};

// GET reaction status of a user
export const getUpvStatus = (id) => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/upvoteReaction/${id}?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'GET_UPV_STATUS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_UPV_STATUS', payload: err.response });
      });
  };
};

// GET favorite status of a user
export const getFavStatus = (id) => {
  return (dispatch) => {
    return axios.get(`${URL}/recipes/${id}/favStatus?token=${xtoken}`)
      .then((response) => {
        dispatch({ type: 'GET_FAV_STATUS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_FAV_STATUS', payload: err.response });
      });
  };
};
