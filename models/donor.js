const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  donation_details: {
    amount: { type: Number, required: true },
    method: { type: String, required: true, enum: ['equal', 'more-odd'] },
    period: { type: Number, required: true, default: 10 },
    start_date: { type: Date, default: Date.now }
  },
  payment_method: {
    name_on_card: { type: String, required: true },
    card_type: { type: String, required: true, enum: ['visa debit', 'visa credit', 'master card', 'american express'] },
    card_number: { type: Number, required: true },
    security_number: { type: Number, required: true },
    expiration_date: { type: String, required: true }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Donor', donorSchema)
