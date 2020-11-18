import axios from 'axios'

const withHeaders = () => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return {
    headers: headers
  }
}

// CREATE DONOR
export const newDonor = FormData => {
  return axios.post('/api/donors', FormData, withHeaders())
}

// GET ALL PERIODS
export const getAllPeriods = () => {
  return axios.get('/api/periods')
}

//CREATE PERIOD
export const newPeriod = FormData => {
  return axios.post('http://localhost:8000/api/periods', FormData, withHeaders())
}

