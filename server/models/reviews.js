export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };

  return Reviews;
};
