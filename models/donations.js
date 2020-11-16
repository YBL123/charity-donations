const mongoose = require('mongoose')

const donationsSchema = new mongoose.Schema({
  dateOfDonation: { type: String, required: true },
  userId: { type: Number, required: true },
  donationAmount: { type: Number, required: true },
  donationMethod: { type: String, required: true }
})


module.exports = mongoose.model('Donations', donationsSchema)