const router = require('express').Router()

const donors = require('../controllers/donors')
const donations = require('../controllers/donations')
const periods = require('../controllers/periods')
const webhooks = require('../controllers/webhooks')

// DONOR
router.route('/donors/:id')
  .get(donors.single)

router.route('/donors')
  .get(donors.index)
  .post(donors.create)

// DONATIONS
router.route('/donations/:id')
  .get(donations.single)

router.route('/donations')
  .get(donations.index)

// DONOR DONATIONS
router.route('/donorDonations/:id')
  .get(donations.donorDonations)

// PERIOD
router.route('/periods/:id')
  .get(periods.single)

router.route('/periods')
  .get(periods.index)
  .post(periods.create)

// DONATION CREATION CRON JOB WEBHOOK
router.route('/donationcreation')
  .post(webhooks.createDonation)



module.exports = router
