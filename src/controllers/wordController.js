const mongoose = require("mongoose");
const DictionaryService = require("../service/DictionaryService");
const Word = require("../models/Word");
const data = require("../utils/data")
const { db_url, key, ttl } = require("../../config");
const { mongoCache } = require("../../index")
const wordController = {
  Create: async (req, res) => {
    word = req.body.word;
    const wordExist = await Word.exists({ id: word });
    if (wordExist) {
      return res.status(400).json({ error: "Word already added!" });
    }
    api_resp = await DictionaryService.GetWord(word);
    lexicalEntries = api_resp.data.results[0].lexicalEntries[0]
    sense = lexicalEntries.entries[0].senses[0]
    if(lexicalEntries.phrases){
      var phrase = lexicalEntries.phrases[0]
    }
    var data = {
      id: word,
      lexicalCategory: lexicalEntries.lexicalCategory.text,
      definition: sense.definitions[0],
      example: sense.examples[0].text,
      synonym: sense.synonyms[0].text,
      phrase: phrase
    };
    resp = await Word.create(data);
    mongoCache.del(key)
    return res.status(201).json({
      success: true,
      data: "Added Successfully",
    });
  },
  FetchAll: async (req, res) => {
    return res.status(200).json({
      success: true,
      data: data(),
    });
  },
};

module.exports = wordController;
