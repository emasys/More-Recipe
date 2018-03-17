require('babel-register');

const HomePageTest = require('../__test_files__/homePage').default;
const SignUpTest = require('../__test_files__/signup').default;
const AddRecipeTest = require('../__test_files__/addRecipe').default;
const catalog = require('../__test_files__/catalog').default;
const recipeDetails = require('../__test_files__/recipeDetails').default;
const favoritePage = require('../__test_files__/favoritePage').default;
const profilePage = require('../__test_files__/profilePage').default;

HomePageTest();
SignUpTest();
AddRecipeTest();
catalog();
recipeDetails();
favoritePage();
profilePage();
