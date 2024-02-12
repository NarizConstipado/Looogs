module.exports = (sequelize, DataTypes) => {
  const note = sequelize.define("notes", {
    icon: {
      type: DataTypes.STRING,
      defaultValue: 'U+1F4C4'
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Note Title'
    },
    trash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return note;
};
