const mongoose = require("mongoose");
const { Schema } = mongoose;

const wordSchema = new Schema({
    id: String,
    definition: String,
    lexicalCategory: String,
    phrase: String,
    example: String,
    synonym: String,
});

module.exports = mongoose.model("Word", wordSchema);