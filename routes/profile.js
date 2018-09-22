'use strict'

const express = require('express')
const router = express.Router()

// const ObjectId = require('mongoose').Types.ObjectId;

const Records = require('../models/record')
// const User = require('../models/user')

/* GET profile page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/')
  }
  res.render('profile')
})

router.get('/records', (req, res, next) => {
  Records.find({ owner: req.session.currentUser._id })
    .then((results) => {
      const data = {
        records: results
      }
      res.render('own-records', data)
    })
    .catch((error) => {
      console.log('there has been an error', error)
    })
})

module.exports = router