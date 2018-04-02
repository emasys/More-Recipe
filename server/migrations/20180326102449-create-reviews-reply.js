export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ReviewsReplies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      moniker: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Reviews',
          key: 'id',
          as: 'reviewId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('ReviewsReplies')
};
