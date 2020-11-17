const ErrorResponse = require('../middleware/errorResponse')
const Period = require('../models/donationPeriod')
const Donation = require('../models/donation')
const moment = require('moment')
const asyncHandler = require('../middleware/async')
const donations = require('./donations')


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
    // RETURNING THE DIFFERENCE AS A NUMBER BETWEEN TWO DATES - TODAY AND START DATE
    const periodDifference = Math.floor((moment() - allPeriods[i].donation_details.start_date) / (1000 * 60 * 60 * 24))
    // CHECKING IF DATE NOW MINUS DONATION START DATE IS GREATER THAN DONATION PERIOD
    // IF TRUE TURN DONATION TO FALSE
    if (periodDifference > allPeriods[i].donation_details.period) {
      await Period.findByIdAndUpdate(allPeriods[i]._id, { active: false })
      console.log('donation date has expired, changing active to false')
    } else {
      query = Donation.find({ donation_period_id: allPeriods[i]._id })
      const donations = await query

      // THIS IS A FLAG THAT WILL BE USED TO DETERMINE IF A PAYMENT HAS BEEN MADE.
      let isPaid = false

      // ITERATING OVER ALL DONATIONS THAT BELONG TO A SINGLE PERIOD AND CHECKING IF A DONATION HAS BEEN MADE 'TODAY'
      donations.map(donation => {
        if (moment(donation.donation_date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
          isPaid = true
        }
      })
    
      // IF NO DONATION HAS BEEN MADE -> CREATE ONE
      if (!isPaid) {
        // PREPPING donation OBJECT TO BE CREATED
        const toPay = await calcDonationPayment(allPeriods[i], periodDifference)
        console.log('toPay', toPay)
        const newDonation = {
          donor_id: allPeriods[i].donor_id,
          donation_amount: toPay,
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


const calcDonationPayment = async (period, periodDifference) => {
  let toPay = 0
  let query
  if (period.donation_details.method === 'equal') {
    toPay = period.donation_details.amount / 10
  } else if (period.donation_details.method === 'more-odd' && periodDifference !== period.donation_details.period) {
    if (periodDifference % 2 === 0) {
      console.log('even')
      toPay = ((period.donation_details.amount * 1 / 3) / (period.donation_details.period / 2)).toFixed(2) // 2 decimal places
    } else if (periodDifference % 2 === 1) {
      console.log('odd')
      toPay = ((period.donation_details.amount * 2 / 3) / (period.donation_details.period / 2)).toFixed(2) // 2 decimal places
    }
    // IF ITS LAST DAY AND THERE IS AN AMOUNT REMAINING
  } else if (period.donation_details.method === 'more-odd' && periodDifference === period.donation_details.period ) {
    // ALL DONATIONS IN A SINGLE GIVEN PERIOD OF TIME
    query = Donation.find({ donation_period_id: period._id })

    const allPeriodDonations = await query

    // COUNTING ALL DONATIONS THAT HAVE BEEN MADE 
    let hasBeenPaid = 0
    for (let i = 0; i < allPeriodDonations.length; i++) {
      hasBeenPaid += allPeriodDonations[i].donation_amount 
    }
    // RETURNING ORIGINAL DONATION AMOUNT - WHAT HAS BEEN PAID = DIFFERENCE
    toPay = period.donation_details.amount - hasBeenPaid
  }
  return toPay.toFixed(2)
}


module.exports = {
  createDonation
}



