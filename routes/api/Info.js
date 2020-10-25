const express = require('express');
const router = express.Router();

const db = require('../../data/mongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const info = {
      query: {},
      collection: req.app.locals.collectionInfo
  }
  db.readAll(info)
    .then((information) => {
        res.json(information)
    })
    .catch(err =>{
        console.log(err);
    })
});

/* CREATES user listing */
router.post('/', function(req,res,next){
    const info = {
        doc: req.body,
        collection: req.app.locals.collectionInfo
    }
    db.createOne(info)
    .then((data) => {
        res.json(data.ops[0]);
    })
    .catch(err =>{
        console.log(err);
    })
})

/* DELETES users listing */
router.delete('/:id', function(req,res,next){
    const info = {
        id: req.params.id,
        collection: req.app.locals.collectionInfo
    }
    db.deleteOne(info)
    .then(() => {
        res.json({msg: `deleted ${info.id}`});
    })
    .catch(err =>{
        console.log(err);
    })
})

/* Updates users listing */
router.put('/:id', function(req,res,next){
    const info = {
        id: req.params.id,
        doc: req.body,
        collection: req.app.locals.collectionInfo
    }
    db.replaceOne(info)
    .then(() => {
        res.json({msg: `updated ${info.id}`});
    })
    .catch(err =>{
        console.log(err);
    })
})

module.exports = router;
