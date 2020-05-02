let express = require("express");
let router = express.Router();
let db = require("../db/models/index");

// bcrypt
const bcrypt = require("bcrypt");

//login
router.post("/", (req, res) => {
  console.log('in login route');
  db.user
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      console.log("data", user.dataValues);
      
      bcrypt
        .compare(req.body.password, user.dataValues.password)
        .then((data) => {
          if(data){
            console.log('in if');
          req.session.email = req.body.email;
          return res.json(user.dataValues);
          }
          else{
            console.log('in else');
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

module.exports = router;
