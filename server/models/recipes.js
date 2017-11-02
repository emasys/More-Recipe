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
      type: DataTypes.STRING,
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
      name: 'required|min:4',
      direction: 'required|min:4',
      ingredients: 'required|min:3'
    };
  };
  Recipes.updateRules = () => {
    return {
      name: 'required|min:4',
      direction: 'required|min:4',
      ingredients: 'required|min:3'
    };
  };
  return Recipes;
};
