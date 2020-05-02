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
      bcrypt
        .compare(req.body.password, user.dataValues.password)
        .then((data) => {
          if (data) {
            req.session.email = req.body.email;
            return res.json(user.dataValues);
          } else {
            return null;
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//
router.get("/", (req, res) => {
  if(req.session && req.session.email){
      res.json(req.session.email);
  }else{
    res.json(false);
  }
});

module.exports = router;
