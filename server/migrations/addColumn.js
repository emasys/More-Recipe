module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'ReviewsReplies',
      'avatar',
      Sequelize.STRING
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('ReviewsReplies', 'avatar');
  }
};
