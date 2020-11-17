const ErrorResponse = require('../middleware/errorResponse')
const Period = require('../models/donationPeriod')
const Donation = require('../models/donation')
const moment = require('moment')
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


  for (let i = 0; i < allPeriods.length; i++) {
    // CHECKING IF DATE NOW MINUS DONATION START DATE IS GREATER THAN DONATION PERIOD
    // IF TRUE TURN DONATION TO FALSE
    if (dateNow - allPeriods[i].donation_details.start_date > allPeriods[i].donation_details.period) {
      await Period.findByIdAndUpdate(allPeriods[i]._id, { active: false })
      console.log('donation date has expired, changing active to false')
    } else {
      query = Donation.findOne({ donation_period_id: allPeriods[i]._id })
      const donation = await query
      // DOES THE DONATION DATE MATCH TODAY'S DATE
      // IF DONATION DATE DOES NOT MATCH TODAY'S DATE
      if (moment(donation.donation_date).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')) {
        // PREPPING donation OBJECT TO BE CREATED
        const newDonation = {
          donor_id: allPeriods[i].donor_id,
          donation_amount: allPeriods[i].donation_details.amount,
          donation_period_id: allPeriods[i]._id
        }
        // IF NOT DONATION HAS BEEN MADE TODAY = CREATING A NEW DONATION
        await Donation.create(newDonation)
        console.log('donation has been made')
      } else {
        // DONATION HAS ALREADY BEEN MADE TODAY
        console.log('donation has already been made today')
      }
    }
  }
  res.sendStatus(200)

})





module.exports = {
  createDonation
}