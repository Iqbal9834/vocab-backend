const { db_url, key, ttl } = require("../../config");
const Word = require("../models/Word");
const DictionaryService = require("../service/DictionaryService");
var cacheManager = require("cache-manager");
var mongoStore = require("cache-manager-mongodb");
var mongoCache = cacheManager.caching({
  store: mongoStore,
  uri: db_url,
  options: { collection: "cacheManager" },
  ttl: ttl,
});
const wordUtil = {
  data: async () => {
    const cache_data = await mongoCache.get(key);
    if (cache_data) {
      return cache_data;
    }
    const resp = await Word.find({}).lean();
    mongoCache.set(key, resp, ttl);
    return resp;
  },
  getWord: async (word) => {
    const wordExist = await Word.exists({ id: word });
    if (wordExist) {
      return "word already created";
    }
    api_resp = await DictionaryService.GetWord(word);
    lexicalEntries = api_resp.data.results[0].lexicalEntries[0];
    sense = lexicalEntries.entries[0].senses[0];
    if (lexicalEntries.phrases) {
      var phrase = lexicalEntries.phrases[0];
    }
    if(sense.examples){
        var example = sense.examples[0].text
    }
    if(sense.definition){
        var definition = sense.definitions[0]
    }
    if(sense.synonyms){
        var synonym = sense.synonyms[0].text
    }
    var data = {
      id: word,
      lexicalCategory: lexicalEntries.lexicalCategory.text,
      definition: definition,
      example: example,
      synonym: synonym,
      phrase: phrase,
    };
    resp = await Word.create(data);
    mongoCache.del(key);
    return await Word.findOne({id: word})
  },
};

module.exports = wordUtil;
