import { Users, Recipes } from '../models';

export default {
  emptyRecipeTable(done) {
    Recipes.destroy({ truncate: true, cascade: true, restartIdentity: true })
      .then(() => done())
      .catch(err => done(err));
  },
  setRecipeInput(name, ingredients, direction) {
    return { name, ingredients, direction };
  },
  setUpdateRecipe(name, ingredients, direction) {
    return { name, ingredients, direction };
  },
  addRecipe(done) {
    Recipes.create({
      name: 'how to cook some stuff',
      ingredient: 'water, salt, pepper',
      direction: 'just do the needful',
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
  setUserInput(firstName, lastName, bio, email, password, confirmPassword) {
    return {
      firstName,
      lastName,
      bio,
      email,
      password,
      confirmPassword,
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
    })
      .then(() => done())
      .catch(err => done(err));
  }
};
