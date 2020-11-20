import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { getCookie, clearAllCookies } from '../lib/cookies'
import { getDonorDonations } from '../lib/api'
import Period from './Period'


const MyDonations = () => {
  const [donationsState, setDonationsState] = useState([])
  const [donorsState, setDonorsState] = useState({})
  const [viewConfigState, setViewConfigState] = useState({
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    errMsg: '',
  })
  const history = useHistory()


    // CLEARS ALL COOKIES WHEN LOGGING OUT DONOR
    const logOutDonor = () => {
      clearAllCookies()
      history.push('/')
    }

  useEffect(() => {
    const donor = getCookie('donor')
    const donorName = getCookie('donor_name')
    if (donor !== '') {
      setDonorsState({ donor: donor, name: donorName })
    } else {
      //if no cookie -> history.push('/)
      history.push('/')
    }

    setViewConfigState({ ...viewConfigState, isLoggedIn: true })

  }, [])

  // IS LOGGED IN?
  useEffect(() => {

    const getDonations = async () => {
      let res = await getDonorDonations(donorsState.donor)

      if (res.status === 200) {
        setDonationsState(res.data)
        setViewConfigState({ ...viewConfigState, isLoading: false })
      }
    }

    if (viewConfigState.isLoggedIn) {
      //CALLING getDonations WITH donor 
      getDonations(donorsState.donor)
    }

  }, [viewConfigState.isLoggedIn])

  let printDonations = (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="amount">Amount</th>
            <th className="split">Split</th>
            <th className="day">Day 1</th>
            <th className="day">Day 2</th>
            <th className="day">Day 3</th>
            <th className="day">Day 4</th>
            <th className="day">Day 5</th>
            <th className="day">Day 6</th>
            <th className="day">Day 7</th>
            <th className="day">Day 8</th>
            <th className="day">Day 9</th>
            <th className="day">Day 10</th>
          </tr>
        </thead>
        <tbody>
          {donationsState.map((donations, index) => {
            return (
              <Period key={index} donations={donations} />
            )
          })}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <h1 className="my-donations-table-header">My Donations</h1>
      {viewConfigState.isLoading ? null : printDonations}
      {/* {vieConfigState.isError ? errMsg : null} */}
      <Link to='/' className="make-another-donation-table-link"> Make another donation? </Link>
      <p className="logout-link" onClick={logOutDonor}>Log out</p> 
    </div>
  )
}

export default MyDonations
