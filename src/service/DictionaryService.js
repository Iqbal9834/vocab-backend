const Api = require("./Api");
const { source_lang } = require("../../config");

module.exports = {
  GetWord(word_id) {
    return Api().get(`/entries/${source_lang}/${word_id}`);
  },
};
