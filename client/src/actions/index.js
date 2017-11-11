import qs from 'qs';
import axios from 'axios';

const URL = 'http://localhost:8081/api/v1';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export const getRecipes = () => {
  const payload = axios.get(`${URL}/recipes`).then(response => {
    return response.data;
    return response.status;
  });
  return { type: 'RECIPES', payload };
};

export const signUp = data => {
  const userInfo = qs.stringify(data);
  console.log(userInfo);
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
      console.log(res);
      return res;
    });

  // const payload = axios
  //   .post(`${URL}/users/signup`, userInfo, config)
  //   .then(res => {
  //     console.log({ status: res.data });
  //     return res.data;
  //   })

  //   .catch(err => {
  //     return err;
  //   });
  return { type: 'SIGN_UP', payload };
};

export const signIn = data => {
  const userInfo = qs.stringify(data);
  console.log(userInfo);
  const payload = fetch(
    `${URL}/users/signin`,

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
      console.log(res);
      return res;
    });

  return { type: 'SIGN_IN', payload };
};
