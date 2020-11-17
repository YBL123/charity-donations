const mongoose = require('mongoose')

const donationPeriodSchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  active: { type: Boolean, default: true },
  donation_details: {
    amount: { type: Number, required: true },
    method: { type: String, required: true, enum: ['equal', 'more-odd'] },
    period: { type: Number, required: true, default: 10 },
    start_date: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Period', donationPeriodSchema)