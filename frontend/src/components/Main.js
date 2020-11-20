import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import NewDonor from './NewDonor'
import NewPeriod from './NewPeriod'

import { getCookie, clearAllCookies, setCookie } from '../lib/cookies'

const Main = () => {

  const [donorsState, setDonorsState] = useState({})
  const [viewConfigState, setViewConfigState] = useState({
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    errMsg: '',
  })

  useEffect(() => {
    console.log('cookie')
    //CHECKING IF COOKIE EXITS -> if it does setDonorState
    const donor = getCookie('donor')
    const donorName = getCookie('donor_name')
    if (donor !== '') {
      setDonorsState({ donor_id: donor, name: donorName })
    }

  }, [])

  useEffect(() => {
    console.log('logged')
    if (donorsState.donor_id !== undefined) {
      setViewConfigState({...viewConfigState, isLoggedIn: true})
    } else {
      setViewConfigState({...viewConfigState, isLoggedIn: false})
    }
  }, [donorsState.donor_id])

  // ONCE DONOR HAS BEEN CREATED SETDONORSTATE WITH donor_id
  const handleNewDonor = (donor) => {

    setDonorsState({donor_id: donor.donor_id, name: donor.name})

    setCookie('donor', donor.donor_id, 30)
    setCookie('donor_name', donor.name, 30)
  }


  // CLEARS ALL COOKIES WHEN LOGGING OUT DONOR
  const logOutDonor = () => {
    clearAllCookies()
    setDonorsState({})
  }


  console.log('donorId in Main', donorsState.donor_id)

  let mainConent = (
    <div className="page-wrap">
      <div className="payment-methods-explanation-wrap">
        <h2>Payment Methods:</h2>
        <h4>
          For a 10 day period.
          <br />
          Equal — the same amount to be donated every day.
          <br />
          More-odd — double the amount to be donated on odd-numbered days.
          <br />
          If there is any money left over at the end of the ten days, you can assume this will be donated on the last day.
        </h4>
      </div>
      <NewDonor handleNewDonor={handleNewDonor} />
    </div>
  )
  return (
    <div>
      {
        viewConfigState.isLoggedIn ? <NewPeriod donorsState={donorsState} logOutDonor={logOutDonor} /> : mainConent
      }
    </div>

  )


}

export default Main












