import axios from 'axios'

// const baseUrl = 'http://localhost:8000/api'
const baseUrl = 'http://localhost:8000/api'

const withHeaders = () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return {
    headers: headers
  }
}

// CREATE DONOR
export const newDonor = FormData => {
  return axios.post(`${baseUrl}/donors`, FormData, withHeaders())
}

// GET ALL PERIODS
export const getAllPeriods = () => {
  return axios.get(`http://localhost:8000/api/periods`)
}

// GET SINGLE PERIOD
export const getSinglePeriod = (periodId) => {
  return axios.get(`http://localhost:8000/api/periods/${periodId}`)
}

// CREATE PERIOD
export const newPeriod = FormData => {
  return axios.post(`http://localhost:8000/api/periods`, FormData)
}

// GET ALL DONATIONS
export const getAllDonations = () => {
  return axios.get(`http://localhost:8000/api/donations`)
}

// GET ALL DONOR DONATIONS
export const getDonorDonations = (donorId) => {
  return axios.get(`http://localhost:8000/api/donorDonations/${donorId}`)
}

// WEBHOOK HACKER
// HITS THE WEBHOOK TO TRIGGER EVERY TIME A NEW PERIOD OR DONOR IS CREATED
export const webhookTrigger = () => {
  const webhookpassword = 'charityDonation'
  return axios.post(`http://localhost:8000/api/donationCreation`, {access_token: webhookpassword})
}