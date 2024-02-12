const { makeExecutableSchema } = require('graphql-tools');

//Schema
const courseSchema = require('./schema/courseSchema.graphql');
const locationSchema = require('./schema/locationSchema.graphql');
const commentSchema = require('./schema/commentSchema.graphql')
const noteSchema = require('./schema/noteSchema.graphql')
const reservationSchema = require('./schema/reservationSchema.graphql')
const toolSchema = require('./schema/toolSchema.graphql');
const userSchema = require('./schema/userSchema.graphql');

//Resolvers
const courseResolvers = require('./resolvers/courseResolvers.js');
const locationResolvers = require('./resolvers/locationResolvers.js');
const commentResolvers = require('./resolvers/commentResolvers.js')
const noteResolvers = require('./resolvers/noteResolvers.js')
const reservationResolvers = require('./resolvers/reservationResolvers.js')
const toolsResolvers = require('./resolvers/toolResolvers.js')
const userResolvers = require('./resolvers/userResolvers.js');


const mainSchema = makeExecutableSchema({
    typeDefs: [
        locationSchema,
        courseSchema,
        locationSchema,
        reservationSchema,
        toolSchema,
        userSchema,
        commentSchema,
        noteSchema,
    ],
    resolvers: [
        locationResolvers,
        courseResolvers,
        userResolvers,
        commentResolvers,
        noteResolvers,
        reservationResolvers,
        toolsResolvers
    ],
});

module.exports = mainSchema;