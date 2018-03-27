export default (sequelize, DataTypes) => {
  const ReviewsReply = sequelize.define('ReviewsReply', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    moniker: DataTypes.STRING
  });
  ReviewsReply.associate = (models) => {
    ReviewsReply.belongsTo(models.Reviews, {
      foreignKey: 'reviewId',
      onDelete: 'CASCADE'
    });
  };
  return ReviewsReply;
};
