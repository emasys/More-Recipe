export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    direction: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    searchIng: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'none'
    },
    foodImg: {
      type: DataTypes.STRING
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
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    reactionDown: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    favorite: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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

    Recipes.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });
  };
  Recipes.createRules = () => ({
    name: 'required',
    direction: 'required',
    ingredients: 'required',
    description: 'required'
  });
  Recipes.updateRules = () => ({
    name: 'required',
    direction: 'required',
    ingredients: 'required'
  });
  return Recipes;
};
