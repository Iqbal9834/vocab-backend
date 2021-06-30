const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    words: [Word!]!
  }
  type Word {
    id: String,
    definition: String,
    lexicalCategory: String,
    phrase: String,
    example: String,
    synonym: String,
  }
  type Mutation {
      create(word: String!): Word
  }
`;
module.exports = typeDefs