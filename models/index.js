console.clear(); // Clear the console before running

const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/db.config.js')
const db = {}
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,
    {
        host: config.HOST,
        dialect: 'mysql'
    });

//DROP ALL TABLES
//sequelize.drop()

db.sequelize = sequelize
db.user = require('./users.model.js')(sequelize, DataTypes)
db.badge = require('./badges.model.js')(sequelize, DataTypes)
db.note = require('./notes.model.js')(sequelize, DataTypes)
db.tag = require('./tags.model.js')(sequelize, DataTypes)
db.reservation = require('./reservations.model.js')(sequelize, DataTypes)
db.location = require('./locations.model.js')(sequelize, DataTypes)
db.comment = require('./comments.model.js')(sequelize, DataTypes)
db.progress = require('./progress.model.js')(sequelize, DataTypes)
db.lesson = require('./lessons.model.js')(sequelize, DataTypes)
db.page = require('./pages.model.js')(sequelize, DataTypes)
db.tools = require('./tools.model.js')(sequelize, DataTypes)
db.component = require('./components.model.js')(sequelize, DataTypes)
db.chapter = require('./chapters.model.js')(sequelize, DataTypes)

// Connections
// 1:M
db.user.hasMany(db.chapter)
db.chapter.belongsTo(db.user)

db.user.hasMany(db.tag)
db.tag.belongsTo(db.user)

db.user.hasMany(db.progress)
db.progress.belongsTo(db.user)

db.lesson.hasMany(db.progress)
db.progress.belongsTo(db.lesson)

db.lesson.hasMany(db.page)
db.page.belongsTo(db.lesson)

db.location.hasMany(db.comment)
db.comment.belongsTo(db.location)

db.location.hasMany(db.reservation)
db.reservation.belongsTo(db.location)

db.user.hasMany(db.reservation)
db.reservation.belongsTo(db.user)

db.note.hasMany(db.component)
db.component.belongsTo(db.note)

// M:N
db.user.belongsToMany(db.note, { through: 'favoriteNotes', as: 'FavoriteNote' })
db.note.belongsToMany(db.user, { through: 'favoriteNotes' });

db.user.belongsToMany(db.comment, { through: 'likes', as: 'Like' })
db.comment.belongsToMany(db.user, { through: 'likes', as: 'Like' });

db.user.belongsToMany(db.badge, { through: 'badgeUser', as: 'BadgeUser'})
db.badge.belongsToMany(db.user, { through: 'badgeUser' });

db.user.belongsToMany(db.note, { through: 'shared', as: 'SharedNote' })
db.note.belongsToMany(db.user, { through: 'shared', as: 'SharedUser' });

db.chapter.belongsToMany(db.note, { through: 'chapterNote', as: 'Note' });
db.note.belongsToMany(db.chapter, { through: 'chapterNote', as: 'Chapter'});

db.tag.belongsToMany(db.note, { through: 'tagsNote', as: 'Note' });
db.note.belongsToMany(db.tag, { through: 'tagsNote', as: 'Tag'});

db.user.belongsToMany(db.location, { through: 'favoriteLocation', as: 'FavoriteLocation' })
db.location.belongsToMany(db.user, { through: 'favoriteLocation' });

db.user.belongsToMany(db.tools, { through: 'toolOrder', as: 'ToolOrder'})
db.tools.belongsToMany(db.user, { through: 'toolOrder' });

// 1:1

//alias
db.note.belongsTo(db.user, { foreignKey: 'creator' });

db.comment.belongsTo(db.user, { foreignKey: 'creator' });


//SYNC DATABASE
//IF YOU WANT TO DELETE OR FORCE SOMETHING INTO THE DB, CHANGE ALTER: FALSE TO TRUE

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log("DB is successfully synchronized");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = db;