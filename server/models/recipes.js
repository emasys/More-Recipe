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
    favorite: {
      type: DataTypes.TEXT,
      defaultValue: 0
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
    reaction: {
      type: DataTypes.TEXT,
      defaultValue: ','
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    viewed: {
      type: DataTypes.STRING,
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
