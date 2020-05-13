let express = require("express");
let router = express.Router();
let db = require("../db/models/index");

// bcrypt
const bcrypt = require("bcrypt");

//Get users
router.get("/", (req, res) => {
  db.user
    .findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Get specific user
router.get("/:id", (req, res) => {
  db.user
    .findOne({
      where: { id: req.params.id },
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Create  user
router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((password) => {
    db.user
      .create({
        handle: req.body.handle,
        email: req.body.email,
        password: password,
        points: req.body.points,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then((users) => {
        req.session.id = users.id;
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

//Update  user score
router.put("/", (req, res) => {
  db.user
    .update(
      {
        points: req.body.points,
      },
      { where: { id: req.body.id } }
    )
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
