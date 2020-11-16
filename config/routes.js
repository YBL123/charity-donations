const router = require('express').Router()

const donors = require('../controllers/donors')
const donations = require('../controllers/donations')

//DONATER
router.route('/donors/:id')
  .get(donors.single)

router.route('/donors')
  .get(donors.index)
  .post(donors.create)

//DONATIONS
router.route('/donations/:id')
  .get(donations.single)

router.route('/donations')
  .get(donations.index)


module.exports = router