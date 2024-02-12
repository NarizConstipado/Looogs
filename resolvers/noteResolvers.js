const db = require("../models/index.js");
const Note = db.note;
const Chapter = db.chapter;
const User = db.user;
const Component = db.component;
const Tag = db.tag;
const { statusName } = require("../utilities/statusMessages.js");
const { Op, literal } = require("sequelize");

const noteResolvers = {
  Query: {
    getNoteById: async (_, { noteID }, context) => {
      try {
        const note = await Note.findOne({
          where: { id: noteID, trash: false },
        });
        if (note === null) return statusName.NOTFOUND;
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          note.creator === context.user.id ||
          context.user.role === "admin" ||
          userIds.includes(context.user.id)
        ) {
          return await Note.findByPk(noteID);
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getNotes: async (_, { page, pageSize }, context) => {
      try {
        if (context.user.role === "admin" || context.user) {
          let user = await User.findByPk(context.user.id);
          const favoriteNotes = await user.getFavoriteNote();
          const favoriteNoteIds = favoriteNotes.map((note) => note.id);

          let result = await Note.findAll({
            offset: page,
            limit: pageSize,
            where: {
              creator: context.user.id,
              trash: false,
              id: { [Op.notIn]: favoriteNoteIds },
            },
          });

          let sharedResult = await user.getSharedNote({
            where: { trash: false, id: { [Op.notIn]: favoriteNoteIds } },
            offset: page,
            limit: result.length == pageSize ? 1 : pageSize - result.length,
          });

          return result.concat(sharedResult);
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getNotesByTitle: async (_, { title, page, pageSize }, context) => {
      try {
        let result = await Note.findAll({
          where: {
            title: { [Op.like]: `%${title}%` },
            creator: context.user.id,
          },
          order: [[literal("CHAR_LENGTH(title)"), "ASC"]],
          offset: page,
          limit: pageSize,
        });

        let user = await User.findByPk(context.user.id);
        let sharedResult = await user.getSharedNote({
          where: {
            title: { [Op.like]: `%${title}%` },
          },
          order: [[literal("CHAR_LENGTH(title)"), "ASC"]],
          offset: page,
          limit: result.length == pageSize ? 1 : pageSize - result.length,
        });

        return result.concat(sharedResult);
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getNotesByChapter: async (_, { chapterID, page, pageSize }, context) => {
      try {
        const chapter = await Chapter.findByPk(chapterID);
        if (
          context.user.role === "admin" ||
          context.user.id == chapter.userId
        ) {
          return await chapter.getNote({ offset: page, limit: pageSize });
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getNotesByTags: async (_, { tags, page, pageSize }, context) => {
      try {
        if (context.user.role === "admin" || context.user) {
          let tagsNotes = await Note.findAll({
            include: { model: Tag, as: "Tag", where: { id: tags } },
          });
          return await tagsNotes;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getTrashedNotes: async (_, { page, pageSize }, context) => {
      try {
        if (context.user.role === "admin" || context.user) {
          let result = await Note.findAll({
            offset: page,
            limit: pageSize,
            where: { creator: context.user.id, trash: true },
          });
          let user = await User.findByPk(context.user.id);
          let sharedResult = await user.getSharedNote({
            where: { trash: true },
            offset: page,
            limit: result.length == pageSize ? 1 : pageSize - result.length,
          });
          return result.concat(sharedResult);
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getFavoriteNotes: async (_, { page, pageSize }, context) => {
      try {
        if (context.user.role === "admin" || context.user) {
          const user = await User.findByPk(context.user.id);
          return await user.getFavoriteNote({
            where: { trash: false },
            offset: page,
            limit: pageSize,
          });
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUserTags: async (_, {}, context) => {
      try {
        if (!context.user) return statusName.UNAUTHORIZED;
        return await Tag.findAll({ where: { userId: context.user.id } });
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUserChapter: async (_, { chapterID }, context) => {
      try {
        if (!context.user) return statusName.UNAUTHORIZED;
        let chapter = await Chapter.findOne({
          where: { id: chapterID, userId: context.user.id },
        });
        return chapter;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUserChapters: async (_, { page, pageSize }, context) => {
      try {
        return await Chapter.findAll({
          where: { userId: context.user.id },
          offset: page,
          limit: pageSize,
        });
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getUserChaptersByTitle: async (_, { title, page, pageSize }, context) => {
      try {
        return await Chapter.findAll({
          where: {
            title: { [Op.like]: `%${title}%` },
            userId: context.user.id,
          },
          order: [[literal("CHAR_LENGTH(title)"), "ASC"]],
          offset: page,
          limit: pageSize,
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getSharedUsers: async (_, { noteID }, context) => {
      try {
        if (!context.user) return statusName.UNAUTHORIZED;
        const note = await Note.findOne({ where: { id: noteID } });
        if (note === null) return statusName.NOTFOUND;
        else if (note.creator != context.user.id)
          return statusName.UNAUTHORIZED;
        const sharedUsers = await note.getSharedUser();
        return sharedUsers;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Mutation: {
    createNote: async (_, {}, context) => {
      try {
        if (!context.user) return statusName.UNAUTHORIZED;
        const newNote = await Note.create({ creator: context.user.id });
        return `Note ${newNote.id} created successfully.`;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editNote: async (_, { noteID, input }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return statusName.NOTFOUND;
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.id === note.creator ||
          userIds.includes(context.user.id) ||
          context.user.role === "admin"
        ) {
          if (input.title) note.title = input.title;
          if (input.icon) note.icon = input.icon;
          let newNote = await note.update({
            title: note.title,
            icon: note.icon,
          });
          return `Note ${newNote.id} has been updated successfully.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    trashNote: async (_, { noteID }, context) => {
      try {
        let note = await Note.findByPk(noteID);
        if (note === null) return `Note ${noteID} does not exist.`;
        if (context.user.role === "admin" || context.user.id === note.creator)
          if (note.trash === true) {
            await note.update({ trash: false });
            return `Note "${note.title}" has been taken out of the trash.`;
          } else {
            await note.update({ trash: true });
            return `Note "${note.title}" has been send to the trash.`;
          }
        else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteNote: async (_, { noteID }, context) => {
      try {
        let note = await Note.findByPk(noteID);
        if (note === null) return `Note with id ${noteID} does not exist.`;
        if (context.user.role === "admin") {
          await note.destroy();
          return `Note with id ${noteID} has been deleted.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    createChapter: async (_, { input }, context) => {
      try {
        await Chapter.create({
          title: input.title,
          color: input.color,
          userId: context.user.id,
        });
        return `Chapter ${input.title} has been created successfully.`;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    addChapter: async (_, { noteID, chapterID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return statusName.NOTFOUND;
        const chapter = await Chapter.findByPk(chapterID);
        if (chapter === null) return statusName.NOTFOUND;
        if (chapter.userId !== context.user.id) return statusName.UNAUTHORIZED;
        if (context.user.role === "admin" || context.user) {
          const noteChapter = await note.getChapter({
            where: { userId: context.user.id },
          });
          if (
            noteChapter.length > 0 &&
            noteChapter[0].userId == context.user.id
          ) {
            await noteChapter[0].removeNote(note);
            await chapter.addNote(note);
            return `Note with ID ${noteID} removed from noteChapter ${noteChapter[0].id} and added to Chapter ${chapterID}.`;
          } else {
            await chapter.addNote(note);
            return `Note with ID ${noteID} added to Chapter with ID ${chapterID}.`;
          }
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editChapter: async (_, { input, chapterID }, context) => {
      try {
        let chapter = await Chapter.findByPk(chapterID);
        if (chapter === null)
          return `Chapter with id ${chapterID} does not exist.`;
        if (
          context.user.id === chapter.userId ||
          context.user.role === "admin"
        ) {
          if (input.title) chapter.title = input.title;
          if (input.color) chapter.color = input.color;
          await chapter.update({
            title: chapter.title,
            color: chapter.color,
          });
          return `Chapter with id ${chapterID} has been updated successfully.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteChapter: async (_, { chapterID }, context) => {
      try {
        const chapter = await Chapter.findByPk(chapterID);
        if (chapter === null)
          return `Chapter with id ${chapterID} does not exist.`;
        if (
          context.user.role === "admin" ||
          context.user.id === chapter.userId
        ) {
          await chapter.destroy();
          return `Chapter with id ${chapterID} has been deleted.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    removeChapter: async (_, { noteID, chapterID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return statusName.NOTFOUND;
        const chapter = await Chapter.findByPk(chapterID);
        if (chapter === null) return statusName.NOTFOUND;
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.role === "admin" ||
          note.creator == context.user.id ||
          userIds.includes(context.user.id)
        ) {
          await chapter.removeNote(note);
          return `Note with ID ${noteID} removed from  Chapter with ID ${chapterID}.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    favoriteNote: async (_, { noteID }, context) => {
      try {
        let note = await Note.findOne({ where: { id: noteID } });
        if (note === null) return `Note with id ${noteID} does not exist.`;
        let user = await User.findOne({ where: { id: context.user.id } });
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.role === "admin" ||
          context.user.id == note.creator ||
          userIds.includes(context.user.id)
        ) {
          if (await user.hasFavoriteNote(note))
            await user.removeFavoriteNote(note);
          else await user.addFavoriteNote(note);
          return statusName.DONE;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    createComponent: async (_, { input, noteID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return `Note with id ${noteID} does not exist.`;
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.id === note.creator ||
          userIds.includes(context.user.id) ||
          context.user.role === "admin"
        ) {
          await Component.create({
            description: input.description,
            value: input.value,
            type: input.type,
            noteId: noteID,
          });
          return statusName.CREATED;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editComponent: async (_, { input, componentID }, context) => {
      try {
        let component = await Component.findByPk(componentID);
        if (component === null)
          return `Component with id ${componentID} does not exist.`;
        const note = await Note.findByPk(component.noteId);
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.id === note.creator ||
          userIds.includes(context.user.id) ||
          context.user.role === "admin"
        ) {
          if (input.description) component.description = input.description;
          if (input.value || input.value == 0) component.value = input.value;
          if (input.type) component.type = input.type;
          await component.update({
            description: component.description,
            value: component.value,
            type: component.type,
          });
          return statusName.DONE;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteComponent: async (_, { componentID }, context) => {
      try {
        const component = await Component.findOne({
          where: { id: componentID },
        });
        if (component === null)
          return `Component with id ${componentID} does not exist.`;
        const note = await Note.findOne({ where: { id: component.noteId } });
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          context.user.id === note.creator ||
          userIds.includes(context.user.id) ||
          context.user.role === "admin"
        ) {
          await component.destroy();
          return `Component with id ${componentID} has been deleted.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    createTag: async (_, { input, noteID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return `Note with id ${noteID} does not exist.`;
        const sharedUsers = await note.getSharedUser();
        const userIds = sharedUsers.map((item) => item.id).flat();
        if (
          note.creator == context.user.id ||
          userIds.includes(context.user.id)
        ) {
          const newTag = await Tag.create({
            text: input.text,
            color: input.color,
            userId: context.user.id,
          });
          await newTag.addNote(note);
          return `Tag with id ${newTag.id} has been created and added to Note with id ${noteID}.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editTag: async (_, { input, tagID }, context) => {
      try {
        let tag = await Tag.findByPk(tagID);
        if (tag === null) return `Tag with id ${tagID} does not exist.`;

        if (context.user.id == tag.userId || context.user.role === "admin") {
          if (input.text) tag.text = input.text;
          if (input.color) tag.color = input.color;
          await tag.update({
            text: tag.text,
            color: tag.color,
          });
          return `Tag with id ${tagID} has been updated.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteTag: async (_, { tagID }, context) => {
      try {
        const tag = await Tag.findByPk(tagID);
        if (tag === null) return `Tag with id ${tagID} does not exist.`;
        if (context.user.role === "admin" || context.user.id === tag.userId) {
          await tag.destroy();
          return `Tag with id ${tagID} has been deleted.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        throw new Error(statusName.INTERNALERROR);
      }
    },
    addTag: async (_, { tagID, noteID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return statusName.NOTFOUND;
        const tag = await Tag.findByPk(tagID);
        if (tag === null) return statusName.NOTFOUND;
        if (context.user.role === "admin" || note.creator == context.user.id) {
          await tag.addNote(note);
          return `Note with ID ${noteID} added to Tag with ID ${tagID}.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    removeTag: async (_, { tagID, noteID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note === null) return statusName.NOTFOUND;
        const tag = await Tag.findByPk(tagID);
        if (tag === null) return statusName.NOTFOUND;
        if (context.user.role === "admin" || tag.userId === context.user.id) {
          await tag.removeNote(note);
          return `Note with ID ${noteID} removed from Chapter with ID ${tagID}.`;
        } else return statusName.UNAUTHORIZED;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    addSharedUser: async (_, { noteID, userID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note.creator !== context.user.id) return statusName.UNAUTHORIZED;
        const user = await User.findByPk(userID);
        if (await note.hasSharedUser(user))
          return "Already have access to this note.";
        else await note.addSharedUser(user);
        return statusName.DONE;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    removeSharedUser: async (_, { noteID, userID }, context) => {
      try {
        const note = await Note.findByPk(noteID);
        if (note.creator !== context.user.id) return statusName.UNAUTHORIZED;
        const user = await User.findByPk(userID);
        if (await note.hasSharedUser(user)) await note.removeSharedUser(user);
        else return "Already don't have access to this note.";
        return statusName.DONE;
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },

  User: {
    notes: async (user) => {
      return await Note.findAll({
        where: { creator: user.id },
      });
    },
  },
  Note: {
    creator: async (note) => {
      return await User.findByPk(note.creator);
    },
    components: async (note) => {
      return await Component.findAll({ where: { noteId: note.id } });
    },
    chapter: async (note, args, context) => {
      const chapterNote = await Note.findByPk(note.id);
      const chapters = await chapterNote.getChapter();
      const userChapter = chapters.find(
        (chapter) => chapter.userId === context.user.id
      );
      if (chapters.length > 0 && userChapter !== null) return userChapter;
      else return null;
    },
    shareWith: async (note) => {
      const sharedNote = await Note.findByPk(note.id);
      return await sharedNote.getSharedUser();
    },
    tags: async (note) => {
      const noteTags = await Note.findByPk(note.id);
      return await noteTags.getTag();
    },
  },
};

module.exports = noteResolvers;
