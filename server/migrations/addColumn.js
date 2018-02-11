module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Recipes',
      'recipeCount',
      Sequelize.INTEGER
    );
  },

  // down(queryInterface, Sequelize) {
  //   return queryInterface.removeColumn('Services', 'service_price');
  // }
};
