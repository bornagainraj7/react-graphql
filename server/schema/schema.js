const graphql = require('graphql');
const lodash = require("lodash");
const BookSchema = require('../models/book.model');
const AuthorSchema = require('../models/author.model');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;


const bookType = new GraphQLObjectType({
  name: 'book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt },
    author: {
      type: authorType,
      resolve(parent, args) {
        return AuthorSchema.findById(parent.authorId);
      }
    }
  }),
});

const authorType = new GraphQLObjectType({
  name: 'author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return BookSchema.find({ authorId: parent.id });
      }
    }
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: bookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return BookSchema.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return BookSchema.find({});
      }
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return AuthorSchema.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
        return AuthorSchema.find({})
      }
    }
  }
});


const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const author = new AuthorSchema({
          name: args.name,
          age: args.age,
        });

        return author.save();
      }
    },
    addBook: {
      type: bookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new BookSchema({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      }
    },
  },
});


module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutations,
});
