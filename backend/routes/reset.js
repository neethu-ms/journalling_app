let express = require('express');
let router = express.Router();
let db = require('../db/models/index');

//Get user goals
router.get("/", (req, res) => {
 
  db.user_goal.destroy({
    where: {}
    
  })
  .then(data => {
    db.biodata.destroy({
      where: {}
    })
    .then(data => {
      
  db.user.destroy({
    where: {}
  })
  .then(data => {
     res.json(data);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });



});


   


module.exports = router;