const Word = require("./models/Word")
const wordUtil = require("./utils/data")
// const { mongoCache } = require("../controllers/wordController");
// const { key, ttl } = require("../../config");

const resolvers = {
  Query: {
    words: () => wordUtil.data()
  },
  Mutation: {
    create: async (_, { word }) => {
      wordUtil.getWord(word)
    }
  }
};
module.exports = resolvers