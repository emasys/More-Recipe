import { Users, Recipes } from '../models';

export default {
  emptyRecipeTable(done) {
    Recipes.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setRecipeInput(name, ingredients, direction, description, foodImg, category) {
    return { name, ingredients, direction, description, foodImg, category };
  },
  setUpdateRecipe(name, ingredients, direction, description) {
    return { name, ingredients, direction, description };
  },
  addRecipe(done) {
    Recipes.create({
      userId: 1,
      name: 'how to cook some stuff',
      ingredient: 'water, salt, pepper',
      direction: 'just do the needful',
      description: 'local Nigerian food',
      foodImg: 'someurl',
      category: 'rice'
    })
      .then(() => done())
      .catch(err => done(err));
  },

  // User authentication
  emptyUserTable(done) {
    Users.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setUserInput(
    firstName, lastName, bio, email, password, confirmPassword,
    country, moniker, avatar
  ) {
    return {
      firstName,
      lastName,
      bio,
      email,
      password,
      confirmPassword,
      country,
      moniker,
      avatar
    };
  },
  setLogin(email, password) {
    return { email, password };
  },
  addUser(done) {
    Users.create({
      firstName: 'Ndukwe',
      lastName: 'Emmanuel',
      bio: 'I am a human from planet earth',
      email: 'emasysnd@gmail.com',
      password: 'password',
      moniker: 'admin',
      country: 'Nigeria',
      avatar: 'someurl'
    })
      .then(() => done())
      .catch(err => done(err));
  },
};
