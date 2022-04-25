const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList } = graphql;

const books = [
  { name: 'Harry Potter and the Philosopher\'s Stone', id: 'book1', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Chamber of Secrets', id: 'book2', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Prisoner of Azkaban', id: 'book3', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Goblet of Fire', id: 'book4', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Order of Phoenix', id: 'book5', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Half Blood Prince', id: 'book6', genre: 'Fantasy', authorId: 'author1'},
  { name: 'Harry Potter and the Deathly Hallows', id: 'book7', genre: 'Fantasy', authorId: 'author1'},
  { name: 'The Fault in Our Stars', id: 'book8', genre: 'Young adult fiction', authorId: 'author3'},
  { name: 'Looking for Alaska', id: 'book9', genre: 'Young adult fiction', authorId: 'author3'},
  { name: 'Paper Towns', id: 'book10', genre: 'Young adult fiction', authorId: 'author3'},
  { name: 'The Perks of being a WallFlower', id: 'book11', genre: 'Young adult fiction', authorId: 'author2'},
  { name: '2 States: The story of my marriage', id: 'book12', genre: 'Fiction', authorId: 'author4'},
  { name: 'The 3 mistakes of my Life', id: 'book13', genre: 'Fiction', authorId: 'author4'},
];

const authors = [
  { name: 'JK Rowling', id: 'author1', age: 52 },
  { name: 'Stephen Chobsky', id: 'author2', age: 50 },
  { name: 'John Green', id: 'author3', age: 45 },
  { name: 'Chetan Bhagat', id: 'author4', age: 45 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id);
      }
    }
  })
});

// how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return books.find( book => book.id === args.id );
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find( author => author.id === args.id );
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
