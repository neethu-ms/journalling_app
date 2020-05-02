let express = require("express");
let router = express.Router();
let db = require("../db/models/index");

// bcrypt
const bcrypt = require("bcrypt");

//login
router.post("/", (req, res) => {
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      console.log("data", user.dataValues);
      bcrypt
        .compare(req.body.password, user.dataValues.password)
        .then(() => {
          req.session.email = req.body.email;
          return res.json(user.dataValues);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
