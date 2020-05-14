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
            req.session.id= user.dataValues.id;
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
  if(req.session && req.session.id){
      res.json(req.session.id);
  }else{
    res.json(false);
  }
});

module.exports = router;
