const Word = require("./models/Word");
const wordUtil = require("./utils/data");
// const { mongoCache } = require("../controllers/wordController");
// const { key, ttl } = require("../../config");

const resolvers = {
  Query: {
    words: () => wordUtil.data(),
    getWord: (root, { id }) => {
      return wordUtil.getById(id)
    }
  },
  Mutation: {
    create: async (_, { word }) => {
      return wordUtil.getWord(word);
    }
  }
};
module.exports = resolvers;
