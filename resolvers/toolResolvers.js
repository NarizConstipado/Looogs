const db = require("../models/index.js");
const Tools = db.tools
const User = require("../models/users.model.js");
const { statusName } = require("../utilities/statusMessages.js");

const toolResolvers = {
  Query: {
    getTool: async (_, { ID }) => {
      // Working
      try {
        return await Tools.find({ where: { id: ID } });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getTools: async (_) => {
      // Working
      try {
        return await Tools.findAll();
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getToolsOrder: async (_, { userID }) => {
      // Working
      try {
        //  Checks in the intermediate table if an item related to the user id
        return await Tools.find(
          {
            include: [{ model: User, through: "ToolOrder" }],
          },
          {
            where: { userId: userID },
          }
        );
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Mutation: {
    createTool: async (_, { input }, context) => {
      // Working
      try {
        if(context.user.role === 'admin') {
          if (input) {
            await Tools.create(input);
            return statusName.CREATED;
          } else {
            throw new Error(statusName.BADREQUEST);
          }
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteTool: async (_, { toolID, name }) => {
      // Working
      try {
        if(context.user.role === 'admin') {
          if(toolID){
            if ((await Tools.findOne({ where: { id: toolID } })) !== null) {
              await Tools.destroy({ where: { id: toolID } });
    
              return statusName.DONE;
            } else {
              throw new Error(statusName.NOTFOUND);
            }
          } else {
            if ((await Tools.findOne({ where: { name: name } })) !== null) {
              await Tools.destroy({ where: { name: name } });
    
              return statusName.DONE;
            } else {
              throw new Error(statusName.NOTFOUND);
            }
          }
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
};

module.exports = toolResolvers