const router = require('express').Router()

const donors = require('../controllers/donors')
const donations = require('../controllers/donations')

//DONOR
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
  .post(donations.create)


module.exports = router