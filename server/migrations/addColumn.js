module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'ReviewsReplies',
      'avatar',
      Sequelize.STRING
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('ReviewsReplies', 'avatar');
  }
};
