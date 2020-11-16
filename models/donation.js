const mongoose = require('mongoose')

const donationsSchema = new mongoose.Schema({
  donation_date: { type: Date, default: Date.now, required: true },
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  donation_amount: { type: Number, required: true },
  donation_period_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true }
}, {
  timestamps: true
})


module.exports = mongoose.model('Donations', donationsSchema)


