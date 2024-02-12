const db = require("../models/index");
const Location = db.location;
const { statusName } = require("../utilities/statusMessages");
const { Op, literal } = require("sequelize");
const locationResolvers = {
  Query: {
    getLocationById: async (_, { locationID }) => {
      try {
        return await Location.findOne({ where: { id: locationID } }).then(result => {
          result.images = JSON.parse(result.images)
          return result
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getLocationsByTitle: async (_, { title, page, pageSize }) => {
      try {
        return await Location.findAll({
          where: { title: { [Op.like]: `%${title}%` } },
          order: [[literal("CHAR_LENGTH(title)"), "ASC"]],
          offset: page,
          limit: pageSize,
        }).then(results => {
          return results.map(result => {
            result.images = JSON.parse(result.images)
            return result
          })
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getLocationByCoords: async (_, { longitude, latitude }) => {
      try {
        return await Location.findOne({
          where: { longitude: longitude, latitude: latitude },
        }).then(result => {
          result.images = JSON.parse(result.images)
          return result
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getLocationsByCategory: async (_, { tag, page, pageSize }) => {
      try {
        return await Location.findAll({ where: { category: tag }, offset: page, limit: pageSize }).then(results => {
          return results.map(result => {
            result.images = JSON.parse(result.images)
            return result
          });
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getLocations: async (_, { page, pageSize }) => {
      try {
        return await Location.findAll({ offset: page, limit: pageSize }).then(results => {
          return results.map(result => {
            result.images = JSON.parse(result.images)
            return result
          });
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Mutation: {
    editLocation: async (_, { locationID, input }, context) => {
      try {
        if (context.user.role === "admin") {
          const location = await Location.findOne({
            where: { id: locationID },
          });
          if (input.address) location.address = input.address;
          if (input.postalCode) location.postalCode = input.postalCode;
          if (input.zone) location.zone = input.zone;
          if (input.title) location.title = input.title;
          if (input.category) location.category = input.category;
          if (input.images) location.images = JSON.stringify(input.images);
          if (input.latitude) location.latitude = input.latitude;
          if (input.longitude) location.longitude = input.longitude;
          if (
            input.reservationIsPossible != null &&
            input.reservationIsPossible != undefined
          )
            location.reservationIsPossible = input.reservationIsPossible;
          await Location.update(
            {
              address: location.address,
              postalCode: location.postalCode,
              zone: location.zone,
              title: location.title,
              category: location.category,
              images: location.images,
              latitude: location.latitude,
              longitude: location.longitude,
              reservationIsPossible: location.reservationIsPossible,
            },
            {
              where: { id: locationID },
            }
          );
          return statusName.DONE;
        }
        return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    registerLocation: async (_, { input }, context) => {
      try {
        if (context.user.role === "admin") {
          if (
            input.address &&
            input.postalCode &&
            input.zone &&
            input.title &&
            input.longitude &&
            input.latitude &&
            input.reservationIsPossible != undefined &&
            input.reservationIsPossible != null &&
            input.category
          ) {
            await Location.create({
              address: input.address,
              postalCode: input.postalCode,
              zone: input.zone,
              title: input.title,
              longitude: input.longitude,
              latitude: input.latitude,
              reservationIsPossible: input.reservationIsPossible,
              category: input.category,
              images: input.images ? JSON.stringify(input.images) : "default.png",
            });
            return statusName.CREATED;
          }
          return statusName.BADREQUEST;
        }
        return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteLocation: async (_, { locationID }, context) => {
      try {
        if (context.user.role === "admin") {
          await Location.destroy({ where: { id: locationID } });
          return statusName.DONE;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    favoriteLocation: async (_, { locationID }, context) => {
      try {
        let location = await Location.findOne({ where: { id: locationID } });
        let user = await db.user.findOne({ where: { id: context.user.id } });
        if (await user.hasFavoriteLocation(location))
          await user.removeFavoriteLocation(location);
        else
          await user.addFavoriteLocation(location)
        return statusName.DONE;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    }
  },
  Location: {
    comments: async (location, { page, pageSize }) => {
      return await db.comment.findAll({
        where: {
          locationId: location.id,
        },
        offset: page,
        limit: pageSize,
      });
    },
  },
};

module.exports = locationResolvers;
