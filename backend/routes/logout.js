let express = require("express");
let router = express.Router();
let db = require("../db/models/index");

//Get users
router.post("/", (req, res) => {
  req.session = null;
  res.json("successfully logged out");

});




module.exports = router;
