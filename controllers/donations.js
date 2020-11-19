const ErrorResponse = require('../middleware/errorResponse')
const Donation = require('../models/donation')
const Donor = require('../models/donor')
const { notFound } = require('../lib/errorMessages')
const asyncHandler = require('../middleware/async')

const donationsIndex = asyncHandler(async (req, res, next) => {
  const donations = await Donation.find()

  if (!donations) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donations)
})

const singleDonation = asyncHandler(async (req, res, next) => {
  //* this id is the object id
  //* whatever goes into /:id is referred to as the req.params.id
  const donationId = req.params.id
  //* if there's a valid mongo id but it's not a 'currently valid' one it will still error now
  const donation = await Donation.findById(donationId)
  if (!donation) {
    return next(new ErrorResponse(notFound, 404))
  }
  res.status(200).json(donation)
})


//GET ALL DONATIONS FOR SINGLE DONOR
const getDonorDonations = asyncHandler(async (req, res, next) => {

  const donorId = req.params.id

  if (!donorId) {
    return next(new ErrorResponse(notFound, 404))
  }
  const donor = await Donor.findById(donorId)
  if (!donor) {
    return next(new ErrorResponse(notFound, 404))
  }

  const donations = await Donation.find({ donor_id: donorId })
  if (donations.length === 0) {
    return next(new ErrorResponse('no donations have been made', 404))
  }

  const organisedDonations = organiseDonationsByPeriod(donations)

  
  res.status(200).json(organisedDonations)
})


const organiseDonationsByPeriod = (donations) => {
  let periodArray = []

  donations.map((donation, index) => {
    if (donation.donation_period_id === )
  })
}


module.exports = {
  index: donationsIndex,
  single: singleDonation,
  donorDonations: getDonorDonations
}