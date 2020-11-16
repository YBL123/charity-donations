const mongoose = require('mongoose')

const donaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, required: true, enum: ['debit', 'visa'] },
  nameOnCard: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  securityNumber: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  donationAmount: { type: Number, required: true },
  donationMethod: { type: String, required: true, enum: ['equal', 'more-odd'] },
  donationPeriod: { type: Number, required: true, default: 10 },
  donationStartDate: { type: Date, default: Date.now  }
}, {
  timestamps: true

})

module.exports = mongoose.model('Donater', donaterSchema)