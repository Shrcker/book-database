const { User, bookSchema } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      return;
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('savedBooks');
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        return;
      }

      const token = signToken(user);

      return { token, user };
    },
    addBook: async(parent, { bookData }, context) => {
      if (context.user) {
        const newBook = await Book.create({
          ...bookData,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook } }
        );

        return newBook;
      }
      // throw console.info("You need to be logged in!");
    },
    removeBook: async (parent, { bookId, username }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { username },
          { $pull: { savedBooks: bookId } }
        );

        return bookId;
      }
      throw AuthenticationError;
    }
  }
};

module.exports = resolvers;
