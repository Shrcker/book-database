const typeDefs = `
  type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
    borrower: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    addUser(username: String!, email:String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: String!, authors: [String], description: String!, image: String, link: String, title: String!): Book
    removeBook(bookId: String!, username: String!): Book
  }
`;

module.exports = typeDefs;
