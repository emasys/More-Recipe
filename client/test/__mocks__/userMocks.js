import { allRecipes } from './recipeMocks';

export const userInfo = {
  success: true,
  data: {
    id: 24,
    firstName: 'Amanhas',
    lastName: 'Noname',
    bio: 'page administrator',
    email: 'admin@gmail.com',
    country: 'judah',
    avatar: 'medusa froze it',
    moniker: 'admin'
  }
};

export const allUsers = {
  success: true,
  users: [
    {
      id: 24,
      email: 'admin@gmail.com',
      password: '$2a$10$xBXQ2RuXUwwOrFzDYIh2WO//WGe1iF5xfdiTXsqRHlreicTleniFG',
      firstName: null,
      moniker: 'admin',
      lastName: null,
      country: null,
      avatar: null,
      bio: null,
      createdAt: '2018-02-14T17:04:54.073Z',
      updatedAt: '2018-02-14T17:04:54.073Z'
    }
  ]
};

export const userRecipes = {
  success: true,
  recipes: allRecipes.recipes
};
