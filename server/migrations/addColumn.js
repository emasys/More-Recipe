module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Recipes',
      'recipeCount',
      Sequelize.INTEGER
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Services', 'service_price');
  }
};
