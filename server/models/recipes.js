export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    direction: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      defaultValue: 'none'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reactionUp: {
      type: DataTypes.TEXT,
      defaultValue: ','
    },
    reactionDown: {
      type: DataTypes.TEXT,
      defaultValue: ','
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    viewed: {
      type: DataTypes.TEXT,
      defaultValue: ','
    }
  });

  Recipes.associate = (models) => {
    Recipes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
  };
  Recipes.createRules = () => {
    return {
      name: 'required',
      direction: 'required',
      ingredients: 'required'
    };
  };
  Recipes.updateRules = () => {
    return {
      name: 'required',
      direction: 'required',
      ingredients: 'required'
    };
  };
  return Recipes;
};
