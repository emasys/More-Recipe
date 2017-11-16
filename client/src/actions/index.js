import qs from 'qs';
import axios from 'axios';
// import storeLocal from 'perform-local-storage';

const URL = 'http://localhost:8081/api/v1';
const xtoken = window.localStorage.getItem('token');

//Fetch All recipes
export const getRecipes = (page, query = '') => {
  const payload = axios
    .get(`${URL}/recipes/page/${page}${query}`)
    .then(response => {
      // console.log(response.data);
      return response.data;
      return response.status;
    });
  return { type: 'RECIPES', payload };
};

//Create a new user
export const signUp = data => {
  const userInfo = qs.stringify(data);
  // console.log(userInfo);
  const payload = fetch(`${URL}/users/signup`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: userInfo
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      window.localStorage.setItem('token', res.token);
      return res;
    });

  return { type: 'SIGN_UP', payload };
};

//Login
export const signIn = data => {
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
    .then(res => {
      window.localStorage.setItem('token', res.token);
      return res;
    });

  return { type: 'SIGN_IN', payload };
};

//Post a review
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
    .then(res => {
      return res;
    });

  return { type: 'REVIEW', payload };
};

//Pagination, view next page
// export const getNextPage = data => {
//   const next = qs.stringify(data);
//   const payload = fetch(`${URL}/recipes/next?token=${xtoken}`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: next
//   })
//     .then(res => res.json())
//     .then(res => {
//       return res;
//     });

//   return { type: 'NEXT', payload };
// };

//search for recipes
export const searchRecipes = data => {
  console.log(data);
  const query = qs.stringify(data);
  console.log(query);
  const payload = fetch(`${URL}/recipes/search?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: query
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });

  return { type: 'SEARCH', payload };
};

//Add a recipe
export const addRecipe = data => {
  const recipe = qs.stringify(data);
  const payload = fetch(`${URL}/recipes?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: recipe
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });

  return { type: 'NEW_RECIPE', payload };
};

//Add Favorite
export const setFavorite = id => {
  const payload = fetch(`${URL}/recipes/${id}/fav?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });

  return { type: 'SET_FAVORITE', payload };
};

//upvote
export const upvote = id => {
  const payload = fetch(`${URL}/recipes/upvote/${id}?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });
  return { type: 'UPVOTE', payload };
};

//downvote
export const downvote = id => {
  const payload = fetch(`${URL}/recipes/downvote/${id}?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });
  return { type: 'DOWNVOTE', payload };
};

//GET reaction status of a user
export const getUpvStatus = id => {
  const payload = fetch(`${URL}/recipes/upvoteReaction/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });
  return { type: 'GET_UPV_STATUS', payload };
};

//Get a single recipe
export const getRecipeItem = id => {
  const payload = fetch(`${URL}/recipes/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });
  return { type: 'RECIPES_ITEM', payload };
};

//GET favorite status of a user
export const getFavStatus = id => {
  const payload = fetch(`${URL}/recipes/${id}/favStatus?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      return res;
    });
  return { type: 'GET_FAV_STATUS', payload };
};
