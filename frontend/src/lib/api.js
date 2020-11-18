import axios from 'axios'

const withHeaders = () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return {
    headers: headers
  }
}


// GET ALL PERIODS
export const getAllPeriods = () => {
  return axios.get('/api/periods')
}

// CREATE DONOR
export const newDonor = FormData => {
  return axios.post('/api/donors', FormData, withHeaders())
}