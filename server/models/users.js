import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moniker: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Users.associate = models => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipeItems'
    });
  };

  Users.prototype.comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  };
  /**
   * Hook for hashing password
   */
  Users.hook('beforeCreate', user => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });

  Users.signUpRules = () => {
    return {
      firstName: 'required|alpha',
      lastName: 'required|alpha',
      email: 'required|email',
      bio: 'required',
      moniker: 'required',
      password: 'required|min:8'
    };
  };
  Users.signInRules = () => {
    return {
      email: 'required|email',
      password: 'required'
    };
  };
  return Users;
};
