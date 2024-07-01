const typeDefs = `
  type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
    borrower: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Query {
    books: [Book]
    users: [User]
    book(id: ID!): Book
    user(id: ID!): User
  }

  type Mutation {
    addBook(title: String!, authors: String!, description: String!, image: String!): Book
  }
`;

module.exports = typeDefs;
