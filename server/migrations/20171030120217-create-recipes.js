export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direction: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      searchIng: {
        type: Sequelize.STRING
      },
      upvote: {
        type: Sequelize.INTEGER
      },
      downvote: {
        type: Sequelize.INTEGER
      },
      favorite: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.INTEGER
      },
      reactionUp: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      reactionDown: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      category: {
        type: Sequelize.STRING
      },
      foodImg: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
