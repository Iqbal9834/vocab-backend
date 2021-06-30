const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

router.post("/add", wordController.Create);
router.get("/get", wordController.FetchAll);

module.exports = router;
