const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  { name: 'Harry Potter and the Philosopher\'s Stone', id: 'book1', genre: 'Fantasy' },
  { name: 'Harry Potter and the Chamber of Secrets', id: 'book2', genre: 'Fantasy' },
  { name: 'Harry Potter and the Prisoner of Azkaban', id: 'book3', genre: 'Fantasy' },
  { name: 'Harry Potter and the Goblet of Fire', id: 'book4', genre: 'Fantasy' },
  { name: 'Harry Potter and the Order of Phoenix', id: 'book5', genre: 'Fantasy' },
  { name: 'Harry Potter and the Half Blood Prince', id: 'book6', genre: 'Fantasy' },
  { name: 'Harry Potter and the Deathly Hallows', id: 'book7', genre: 'Fantasy' },
];
// first object type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
});

// how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db/other source
        return books.find(book => book.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});