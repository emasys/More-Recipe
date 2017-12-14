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

  Users.associate = (models) => {
    Users.hasMany(models.Recipes, {
      foreignKey: 'userId',
      as: 'recipeItems'
    });
  };

  // decrypt the password before login
  Users.prototype.comparePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
  };
  // encrypt the password before saving data into database while signing up
  Users.beforeCreate((user) => {
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
  });
  // encrypt the password before update data already in the database

  Users.beforeUpdate((user) => {
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
  });


  return Users;
};
