module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define("locations", {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide an address!` },
      },
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide a postal code!` },
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide the location title!` },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide a tag for the location!` },
      },
    },
    images: {
      type: DataTypes.STRING,
    },
    site: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Please provide the location zone!` },
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    reservationIsPossible: {
      type: DataTypes.BOOLEAN,
    }
  });
  return location;
};
