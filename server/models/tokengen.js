export default (sequelize, DataTypes) => {
  const TokenGen = sequelize.define('TokenGen', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return TokenGen;
};
