const db = require('../models/index.js');
const Lessons = db.lesson
const Pages = db.page
const Progress = db.progress
const { statusName } = require("../utilities/statusMessages.js");
const { Op, literal } = require("sequelize");

const courseResolvers = {
  Query: {
    getCourseByID: async (_, { courseID }) => {
      // Working
      try {
        return await Lessons.findByPk(courseID);
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getCoursesByTitle: async (_, { title, page, pageSize }) => {
      // Working
      try {
        return await Lessons.findAll({ 
          where: { title: { [Op.like ]: `%${title}%`} },
          order: [[literal("CHAR_LENGTH(title)"), "ASC"]],
          offset: page,
          limit: pageSize,
        });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getCourses: async (_, { page, pageSize }) => {
      // Working
      try {
        return await Lessons.findAll({ offset: page, limit: pageSize });
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getProgressByID: async ( _ , { progressID }) => {
      try {
        // it isn't returning the course in apoll
        if(await Progress.findByPk(progressID)) {
          return Progress.findByPk(progressID)
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    getProgressByCourseID: async ( _ , { courseID }) => {
      try {
        // it isn't returning the course in apollo
        if(await Progress.findOne({where: {lessonId: courseID}})) {
          return Progress.findOne({where: {lessonId: courseID}})
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    }
  },
  Mutation: {
    createCourse: async (_, { input }, context) => {
      // Working
      try {
        if(context.user.role === 'admin') {
          if (input) {
  
            const lesson = {
              title: input.title,
              description: input.description,
              image: input.image
            }
            
            await Lessons.create(lesson);
            
            const lessonId = await Lessons.findAll()
  
            const page = {
              description: input.pages[0].description,
              image: input.pages[0].image,
              lessonId: lessonId[lessonId.length - 1].id 
            } 
            
            await Pages.create(page)

            return statusName.CREATED;
          } else {
            throw new Error(statusName.BADREQUEST);
          }  
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editCourse: async (_, { courseID, title, description }, context) => {
      // Working
      try {
        if (context.user.role === 'admin') {
          const lesson = await Lessons.findByPk( courseID );
          if (lesson) {
            const updatedLesson = {
              title: title ? title : lesson.title,
              description: description ? description : lesson.description,
            };
            
            await Lessons.update({ updatedLesson }, { where: { id: courseID } });
            
            return statusName.DONE;
          } else {
            throw new Error(statusName.BADREQUEST);
          }
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editPage: async (_, { pageID, description, image }, context) => {
      // Working
      try {
        if (context.user.role === 'admin') {
          const page = await Pages.findByPk(pageID);
  
          if (page) {
            const updatedPage = {
              description: description ? description : page.description,
              image: image ? image : page.image,
            };
  
            console.log(pageID, updatedPage);
            await Pages.update({            
              description: description ? description : page.description,
              image: image ? image : page.image, }, { where: { id: pageID } 
            });
  
            return statusName.DONE;
          } else {
            throw new Error(statusName.BADREQUEST);
          }
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editProgressByID: async ( _ , {progressID, progressValue}, context) => {
      try {
        
        if(await Progress.findOne({where: {id: progressID, userId: context.user.id}})) {

          const progress = await Progress.findByPk(progressID)

          if(progressValue > progress.progressValue){
            await Progress.update({
              progressValue: progressValue
            }, {where: {id: progressID}})
  
            return statusName.DONE;
          }
        } else {
          throw new Error(statusName.BADREQUEST)
        }

      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    editProgressByCourseID: async ( _ , {courseID, progressValue}, context) => {
      try {
        
        if(await Progress.findOne({where: {lessonId: courseID, userId: context.user.id}})) {

          const progress = await Progress.findOne({where: {lessonId: courseID}})

          if(progressValue > progress.progressValue) {
            await Progress.update({
              progressValue: progressValue
            }, {where: {lessonId: courseID}})
  
            return statusName.DONE;
          }

        } else {

          const progress = {
            progressValue: progressValue,
            lessonId: courseID,
            userId: context.user.id
          }

          await Progress.create(progress)

          return statusName.DONE;
        }

      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
    deleteCourse: async (_, { courseID }, context) => {
      // Working
      try {
        if(context.user.role === 'admin') {
          if ((await Lessons.findByPk(courseID)) !== null) {
  
            const pages = await Pages.findAll({ where: { lessonId: courseID }})
            await Lessons.destroy({ where: { id: courseID } });
  
            pages.forEach(async (page) => {
              console.log(page.id);
              await Pages.destroy({ where: { id: page.id } });
            });
  
            return statusName.DONE;
          } else {
            throw new Error(statusName.NOTFOUND);
          }
        } else {
          throw new Error(statusName.NOTAUTHORIZED);
        }
      } catch (err) {
        console.error(err);
        throw new Error(statusName.INTERNALERROR);
      }
    },
  },
  Course: {
    pages: async (course, {page, pageSize}) => {
      return await Pages.findAll({where: {lessonId: course.id}, offset: page, limit: pageSize})
    }
  }
};

module.exports = courseResolvers;
