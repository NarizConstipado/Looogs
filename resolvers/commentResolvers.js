const db = require('../models/index');
const Comment = db.comment;
const { statusName } = require("../utilities/statusMessages");

const commentResolvers = {
  Query: {
    getComment: async (_, { commentID }) => {
      try {
        return await Comment.findOne({ where: { id: commentID } });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getComments: async (_, { page, pageSize }) => {
      try {
        return await Comment.findAll({ offset: page, limit: pageSize });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Mutation: {
    editComment: async (_, { commentID, description }, context) => {
      try {
        if (description && commentID) {
          const comment = await Comment.findOne({ where: { id: commentID } });
          if (context.user.id === comment.creator) {
            await Comment.update(
              {
                description: description,
                edited: true,
              },
              { where: { id: comment.id } }
            );
            return statusName.DONE;
          }
          return statusName.UNAUTHORIZED;
        }
        return statusName.BADREQUEST;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    createComment: async (_, { locationID, description }, context) => {
      try {
        if (description && locationID && context.user.id) {
          await Comment.create({
            description: description,
            creator: context.user.id,
            locationId: locationID
          });
          return statusName.CREATED;
        }
        return statusName.BADREQUEST;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteComment: async (_, { commentID }, context) => {
      try {
        const comment = await Comment.findOne({ where: { id: commentID } });
        if (comment) {
          if (context.user.id === comment.id || context.role === "admin") {
            await Comment.destroy({ where: { id: commentID } });
            return statusName.DONE;
          }
          return statusName.UNAUTHORIZED;
        }
        return statusName.BADREQUEST;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    addLike: async (_, { commentID }, context) => {
      try {
        const comment = await Comment.findByPk(commentID);
        const user = await db.user.findByPk(context.user.id);
        await comment.addLike(user)
        return statusName.CREATED;
      } catch (err) {
        console.error(err);
      }
    },
    removeLike: async (_, { commentID }, context) => {
      try {
        const comment = await Comment.findByPk(commentID);
        const user = await db.user.findByPk(context.user.id);
        await comment.removeLike(user)
        return statusName.DONE;
      } catch (err) {
        console.error(err);
      }
    }
  },
  Comment: {
    likes: async comment => {
      console.log(await comment.getLike());
      return await comment.getLike()
    },
    creator: async comment => {
      return await db.user.findOne({
        where: {
          id: comment.creator
        }
      })
    }
  }
};

module.exports = commentResolvers;
