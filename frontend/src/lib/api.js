import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/'

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
  return axios.get(`${baseUrl}/periods`)
}

//CREATE PERIOD
export const newPeriod = FormData => {
  return axios.post(`${baseUrl}/periods`, FormData, withHeaders())
}

