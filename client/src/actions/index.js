import qs from 'qs';
import axios from 'axios';
// import fetch from 'isomorphic-fetch';
import 'whatwg-fetch';
// import storeLocal from 'perform-local-storage';

const URL = '/api/v1';
const xtoken = window.localStorage.getItem('token');

// Fetch All recipes
export const getRecipes = (page, query = '') => {
  const payload = axios
    .get(`${URL}/recipes/page/${page}${query}`)
    .then((response) => {
      return response.data;
    });
  return { type: 'RECIPES', payload };
};

// Get a single recipe
export const getRecipeItem = (id) => {
  const payload = fetch(`${URL}/recipes/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'RECIPES_ITEM', payload };
};

// Get user specific recipes
export const getUserRecipes = (limit, id) => {
  const payload = fetch(`${URL}/recipes/yours/${limit}/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  return { type: 'USER_RECIPES', payload };
};

// Get a specific user
export const getUserInfo = (id) => {
  const payload = fetch(`${URL}/users/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'USER_INFO', payload };
};

// user profile
export const getProfile = (id) => {
  const payload = fetch(`${URL}/users/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'USER_PROFILE', payload };
};

export const deleteUser = (id) => {
  const payload = fetch(`${URL}/users/${id}?token=${xtoken}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'DELETE_USER', payload };
};

// fetch all users
export const getAllUsers = () => {
  const payload = fetch(`${URL}/users?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'ALL_USERS', payload };
};

// Get user favorites
export const getFavs = () => {
  const payload = fetch(`${URL}/recipes/fav?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'GET_FAVORITES', payload };
};
/**
 *
 *
 * @param {any} data
 * @param {any} id
 * @returns
 */
export const getCategory = (data, limit) => {
  const info = qs.stringify(data);
  // console.log(info);
  const payload = fetch(`${URL}/recipes/category/${limit}?token=${xtoken}`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: info
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });

  return { type: 'GET_CATEGORY', payload };
};
// edit recipe
export const editRecipe = (data, id) => {
  const info = qs.stringify(data);
  // console.log(info);
  const payload = fetch(`${URL}/recipes/${id}?token=${xtoken}`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: info
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });

  return { type: 'EDIT_RECIPE', payload };
};
// Create a new user
export const signUp = (data) => {
  const info = qs.stringify(data);
  const payload = fetch(`${URL}/users/signup`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: info
  })
    .then(res => res.json())
    .then((res) => {
      window.localStorage.setItem('token', res.token);
      const jwtbug = window.localStorage.getItem('token');
      if (jwtbug.length > 9) {
        // console.log(res);
        return res;
      } else {
        window.localStorage.removeItem('token');
        return res;
      }
    });

  return { type: 'SIGN_UP', payload };
};

// Login
export const signIn = (data) => {
  const userInfo = qs.stringify(data);
  // console.log(userInfo);
  const payload = fetch(`${URL}/users/signin`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: userInfo
  })
    .then(res => res.json())
    .then((res) => {
      window.localStorage.setItem('token', res.token);
      const jwtbug = window.localStorage.getItem('token');
      if (jwtbug.length > 9) {
        return res;
      } else {
        window.localStorage.removeItem('token');
        return res;
      }
    });

  return { type: 'SIGN_IN', payload };
};

// Post a review
export const postReview = (data, id) => {
  const review = qs.stringify(data);
  const payload = fetch(`${URL}/recipes/${id}/reviews?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: review
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });

  return { type: 'REVIEW', payload };
};

// search for recipes
export const searchRecipes = (data) => {
  // console.log(data);
  const query = qs.stringify(data);
  // console.log(query);
  const payload = fetch(`${URL}/recipes/search?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });

  return { type: 'SEARCH', payload };
};

// Add a recipe
export const addRecipe = (data) => {
  const query = qs.stringify(data);
  // console.log(query);
  const payload = fetch(`${URL}/recipes?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
  })
    .then(res => res.json())
    .then((res) => {
      // console.log(res);
      return res;
    });
  return { type: 'NEW_RECIPE', payload };
};

// Add Favorite
export const setFavorite = (id) => {
  const payload = fetch(`${URL}/recipes/${id}/fav?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });

  return { type: 'SET_FAVORITE', payload };
};

// Delete Recipe
export const delRecipe = (id) => {
  const payload = fetch(`${URL}/recipes/${id}?token=${xtoken}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });

  return { type: 'DELETE_RECIPE', payload };
};

// upvote
export const upvote = (id) => {
  const payload = fetch(`${URL}/recipes/upvote/${id}?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  return { type: 'UPVOTE', payload };
};

// downvote
export const downvote = (id) => {
  const payload = fetch(`${URL}/recipes/downvote/${id}?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  return { type: 'DOWNVOTE', payload };
};

// GET reaction status of a user
export const getUpvStatus = (id) => {
  const payload = fetch(`${URL}/recipes/upvoteReaction/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  return { type: 'GET_UPV_STATUS', payload };
};

// GET favorite status of a user
export const getFavStatus = (id) => {
  const payload = fetch(`${URL}/recipes/${id}/favStatus?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then((res) => {
      return res;
    });
  return { type: 'GET_FAV_STATUS', payload };
};
