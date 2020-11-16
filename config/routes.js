const router = require('express').Router()

const donaters = require('../controllers/donaters')
// const donations = require('../controllers/donations')


//DONATER
router.route('/donaters/:id')
  .get(donaters.single)

router.route('/donaters')
  .get(donaters.index)
  .post(donaters.create)


//DONATIONS
// router.route('/donations/:id')
//   .get(donations.show)

// router.route('/donatinos')
//   .get(donations.index)
//   .post(donations.create)


module.exports = router