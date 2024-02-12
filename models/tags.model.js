module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define("tags", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide the tag title!` },
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide the tag color!` },
      },
    },
  });
  return tag;
};
