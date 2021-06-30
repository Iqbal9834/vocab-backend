const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  secret: process.env.SECRET,
  expires: process.env.EXPIRE,
  app_id: process.env.APP_ID,
  app_key: process.env.APP_KEY,
  base_url: process.env.BASE_URL,
  source_lang: process.env.SOURCE_LANG,
  key: process.env.KEY,
  ttl: process.env.TTL
};
