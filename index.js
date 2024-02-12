console.clear();
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;
const Apollo = require('apollo-server-express');
const auth = require('./auth/auth.js');

const utilities = require('./utilities/statusMessages.js');
const mainSchema = require('./mainSchema.js');

app.use(express.json()); //enable parsing JSON body data
app.use(cors({ origin: '*' }))

const server = new Apollo.ApolloServer({
    schema: mainSchema,
    context: async ({ req }) => {

        let token = req.headers.authorization || '';
        if (token) {
            token = auth.decode(token)
        };
        const user = token;
        return { req, user };
    },
    formatError: (err) => {
        const error = utilities.getErrorCode(err.message);
        return ({ message: error.message, statusCode: error.statusCode })
    }
})

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.use(cors);
    app.listen(port, () => {
        console.log(`Apollo Server is running on http://${host}:${port}/graphql`);
    })
})

module.exports = app;
module.exports = server;