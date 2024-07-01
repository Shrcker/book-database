const { Book, User } = require('../models');

const resolvers = {
  Query: {
    books: async() => {
      return await Book.find({}).populate('books').populate({
        path: 'users',
        populate: 'user',
      });
    },
    users: async () => {
      return await User.find({}).populate('books');
    }
  }
};

module.exports = resolvers;
