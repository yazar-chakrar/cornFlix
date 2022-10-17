/*jshint esversion: 8 */
const express = require('express');
const {graphqlHTTP} = require('express-graphql');

// Routes
const genreSchema = require('./schemas/genreSchema');

module.exports = function(app) {
    app.use(express.json());
    app.use('/graphql', graphqlHTTP({
 
        //directing express-graphql to use this schema to map out the graph
      
        schema: genreSchema,
      
        //directing express-graphql to use graphiql when goto '/graphql' address in the browser
      
        //which provides an interface to make GraphQl queries
      
        graphiql:true
      
     }));
};