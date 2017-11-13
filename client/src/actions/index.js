import qs from 'qs';
import axios from 'axios';
// import storeLocal from 'perform-local-storage';

const URL = 'http://localhost:8081/api/v1';

export const getRecipes = () => {
  const payload = axios.get(`${URL}/recipes`).then(response => {
    return response.data;
    return response.status;
  });
  return { type: 'RECIPES', payload };
};

export const signUp = data => {
  const userInfo = qs.stringify(data);
  // console.log(userInfo);
  const payload = fetch(
    `${URL}/users/signup`,

    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: userInfo
    }
  )
    .then(res => res.json())
    .then(res => {
      // console.log(res);
      return res;
    });

  return { type: 'SIGN_UP', payload };
};

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
export const postReview = data => {
  const review = qs.stringify(data);
  const payload = fetch(`${URL}recipes/${data.id}/reviews?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: review
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });

  return { type: 'REVIEW', payload };
};

export const setFavorite = id => {
  // const userInfo = qs.stringify(data);
  // console.log(userInfo);
  const payload = fetch(`${URL}recipes/${id}/fav?token=${xtoken}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // body: userInfo
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });

  return { type: 'SET_FAVORITE', payload };
};

export const getRecipeItem = id => {
  const xtoken = window.localStorage.getItem('token');
  const payload = fetch(`${URL}/recipes/${id}?token=${xtoken}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
  return { type: 'RECIPES_ITEM', payload };
};
