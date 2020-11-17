const ErrorResponse = require('../middleware/errorResponse')
const Period = require('../models/donationPeriod')
const Donation = require('../models/donation')
const moment = require('moment')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')


const createDonation = asyncHandler(async (req, res, next) => {

  const dateNow = moment()

  // VALIDATE ACCESS TOKEN TO WEBHOOK
  if (req.body.access_token !== process.env.CRON_ACCESS_TOKEN) {
    return next(new ErrorResponse('invalid access token', 400))
  }

  // FIND ALL PERIODS
  // ONLY WHERE ACTIVE PERIODS BOOLEAN IS TRUE
  let query = Period.find({ active: true })
  const allPeriods = await query


  // MAPPING OVER allPeriods TO GO OVER EACH ACTIVE PERIOD -> MAKE DONATION PAYMENT IF IT'S STILL VALID
  allPeriods.map(period => {
    // CHECKING IF DATE NOW MINUS DONATION START DATE IS GREATER THAN DONATION PERIOD
    // IF TRUE TURN DONATION TO FALSE
    if (dateNow - period.donations_detials.start_date > period.donations_detials.period) {
      // query = await Period.findByIdAndUpdate(period._id, { active: false })
      console.log('change to false')
    } else {
      //
      query = await Donation.find({ donation_period_id: period._id, donation_date: moment().format('YYYY-MM-DD') })
      if (!query) {
        // PREPPING donation OBJECT TO BE CREATED
        const donation = {
          donor_id: period.donor_id,
          donation_amount: period.donation_details.amount,
          donation_period_id: newPeriod._id
        }

        // CREATING A NEW DONATION
        const newDonation = await Donation.create(donation)
      }
      console.log('create a donation')
    }
  })

  res.status(200).json(allPeriods)


})





module.exports = {
  createDonation
}