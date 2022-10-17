/*jshint esversion: 8 */
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

module.exports = GenreType;

