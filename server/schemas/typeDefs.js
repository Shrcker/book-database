const typeDefs = `
  type Book {
    bookId: ID
    authors: [String]
    description: String
    image: String
    link: String
    title: String
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
  }
`;

module.exports = typeDefs;
