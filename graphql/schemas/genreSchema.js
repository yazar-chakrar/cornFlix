/*jshint esversion: 8 */
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema,GraphQLInt, GraphQLString, GraphQLList} = graphql;
const GenreType = require('../types/genre');

const {Genre} = require('../../models/genre');

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      getAllGenres: {
        type: new GraphQLList(GenreType),
        args: { id: { type: GraphQLInt } },
        async resolve(parent, args) {
          const genres = await Genre.find().sort('name');
          return genres;
        },
      },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createGenre: {
            type: GenreType,
            args: {
                name: {type: GraphQLString}
            },
            async resolve(){
                let genre = new GenreDB({ name: args.name });
                genre = await genre.save();
                return genre;
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });




