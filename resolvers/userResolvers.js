const db = require("../models/index.js");
const User = db.user
const bcrypt = require("bcryptjs");
const auth = require("../auth/auth");
const { statusName } = require("../utilities/statusMessages.js");

const userResolvers = {
  Query: {
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ where: { username: username } });
        if (bcrypt.compareSync(password, user.password)) {
          return auth.createToken(user);
        } else {
          return `Invalid credentials. Please try again`;
        }
      } catch (error) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getMe: async (_, { }, context) => {
      try {
        return await User.findOne({ where: { id: context.user.id } });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUser: async (_, { userID }, context) => {
      try {
        if (context.user.role === "admin")
          return await User.findOne({ where: { id: userID }, attributes: { exclude: ['password'] } });
        else
          return await User.findOne({ where: { id: userID }, attributes: { exclude: ['password', 'address', 'email'] } });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUsers: async (_, { page, pageSize }, context) => {
      try {
        if (context.user.role === "admin")
          return await User.findAll({ offset: page, limit: pageSize, attributes: { exclude: ['password'] } });
        else
          return await User.findAll({ offset: page, limit: pageSize, attributes: { exclude: ['password', 'address', 'email'] }, });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Mutation: {
    editMe: async (_, { input }, context) => {
      try {
        const user = await User.findOne({ where: { id: context.user.id } });
        if (input.email) user.email = input.email;
        if (input.username) user.username = input.username;
        if (input.password) user.password = bcrypt.hashSync(input.password, 10);
        if (input.address) user.address = input.address;
        if (input.image) user.image = input.image;
        if (input.phone) user.phone = input.phone;
        await User.update(
          {
            email: user.email,
            username: user.username,
            password: user.password,
            image: user.image,
            address: user.address,
            phone: user.phone,
          },
          {
            where: { id: user.id },
          }
        );
        return statusName.DONE;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editUser: async (_, { userID, input }, context) => {
      try {
        if (context.user.role === 'admin' || context.user.id === userID) {
          const user = await User.findOne({ where: { id: userID } });
          if (input.email) user.email = input.email;
          if (input.username) user.username = input.username;
          if (input.password) user.password = input.password;
          if (input.address) user.address = input.address;
          if (input.phone) user.phone = input.phone;
          await User.update(
            {
              email: user.email,
              username: user.username,
              password: user.password,
              address: user.address,
              phone: user.phone,
            },
            {
              where: { id: user.id },
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
    editUserRole: async (_, { userID, role }, context) => {
      try {
        if (context.user.role === 'admin') {
          await User.update(
            {
              role: role
            },
            {
              where: { id: userID },
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
    deleteMe: async (_, { }, context) => {
      try {
        await User.destroy({ where: { id: context.user.id } });
        return statusName.DONE
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteUser: async (_, { userID }, context) => {
      try {
        if (userID === context.user.id || context.user.role === 'admin') {
          await User.destroy({ where: { id: userID } });
          return statusName.DONE;
        }
        return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    register: async (_, { input }) => {
      try {
        input.password = bcrypt.hashSync(input.password, 10)
        await User.create(input);
        return statusName.CREATED
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  User: {
    notes: async (user, { page, pageSize }) => {
      return await db.note.findAll({
        where: {
          IdCreator: user.id
        },
        offset: page,
        limit: pageSize
      })
    },
    comments: async (user, { page, pageSize }) => {
      return await db.comment.findAll({
        where: {
          IdCreator: user.id
        },
        offset: page,
        limit: pageSize
      })
    },
    badges: async (user, { page, pageSize }) => {
      return await db.badge.findAll(
        {
          include: [{ model: User, through: "badgeUser" }]
        },
        {
          where: {
            userId: user.id
          },
          offset: page,
          limit: pageSize
        }
      )
    },
    progresses: async (user, { page, pageSize }) => {
      return await db.progress.findAll(
        {
          where: {
            userId: user.id
          },
          offset: page,
          limit: pageSize
        }
      )
    },
    reservations: async (user, { page, pageSize }) => {
      return await db.reservation.findAll(
        {
          where: {
            userId: user.id
          },
          offset: page,
          limit: pageSize
        }
      )
    },
    toolsOrder: async (user, { page, pageSize }) => {
      return await db.tools.findAll(
        {
          include: [{ model: User, through: "ToolOrder" }],
        },
        {
          where: {
            userId: user.id
          }
        }
      )
    },
    favorites: async (user, { page, pageSize }) => {
      const getUser = await User.findOne({ where: user.id })
      let favorite = {};
      favorite.notes = await getUser.getFavoriteNote()
      favorite.locations = await getUser.getFavoriteLocation()
      return favorite
    }
  }
};

module.exports = userResolvers;