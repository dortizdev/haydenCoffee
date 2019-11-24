const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const db = require('../config/keys').MongoURI;
const client = require('../app');
// Order Model
const Order = require('../models/Order');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

const app = express();


router.post('/submitOrder', (req, res) => {
  console.log(req.body.name);
  const order = new Order({
    name: req.body.name,
    order: req.body.order
  });
  console.log(order);
  order.save()
    .then(user => {
      res.redirect('/');
    })
    .catch(err => console.log(err))
})

// Orders
router.get('/orders', ensureAuthenticated, (req, res) => {
  const db = mongoose.connection;
  db.collection('orders').find().toArray((err, result) => {
    res.render('orders', {
      orders: result,
      user: req.user
    })
  })
});

router.put('/completed', (req, res) => {
  const db = mongoose.connection;
  console.log(req.body);
  db.collection('orders').findOneAndUpdate({name: req.body.name}, {
    $set: {
      completed: true
    }
  }, {
    sort: {_id: -1},
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// Orders
router.get('/orders', ensureAuthenticated, (req, res) => {
  const db = mongoose.connection;
  db.collection('orders').find().toArray((err, result) => {
    res.render('orders', {
      orders: result,
      user: req.user
    })
  })
});

router.put('/orders', (req, res) => {
  const db = mongoose.connection;
  db.collection('orderss')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})




module.exports = router;
