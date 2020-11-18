import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import NewDonor from './NewDonor'
import NewPeriod from './NewPeriod'

import { getCookie, clearAllCookies, setCookie } from '../lib/cookies'

const Main = () => {

  const [donorsState, setDonorsState] = useState({})

  useEffect(() => {

    //CHECKING IF COOKIE EXITS -> if it does setDonorState
    const donor = getCookie('donor')
    const donorName = getCookie('donor_name')
    if (donor !== '') {
      setDonorsState({ donor: donor, name: donorName })
    }

  }, [])


  // ONCE DONOR HAS BEEN CREATED SETDONORSTATE WITH DONORID
  const handleNewDonor = (donor) => {

    setDonorsState(donor)

    setCookie('donor', donor.donorId, 30)
    setCookie('donor_name', donor.name, 30)
  }

  // CLEARS ALL COOKIES WHEN LOGGING OUT DONOR
  const logOutDonor = () => {
    clearAllCookies()
    setDonorsState({})
  }

  // THIS CONTENT WILL APPEAR IF A DONOR HAS ALREADY MADE A DONATION/ LOGGED IN
  // PASSING donorId AS PROPS TO NewPeriod
  let subContent = (
    <div>
      <div>
        <h2>Hi, {donorsState.name} </h2>
        <br />
        <h3>Thank you for your donation!</h3>
      </div>
      <h3>Would you like to make another donation?</h3>
      <Link to='/mydonations'> Check your donations </Link>
      <NewPeriod donorId={donorsState.donorId} />
      <button onClick={logOutDonor}>Log out</button>
    </div>
  )


  let mainConent = (
    <div className="page-wrap">
      {
        Object.keys(donorsState).length === 0 ? <NewDonor handleNewDonor={handleNewDonor} /> : subContent
      }

    </div>
  )
  return (
    <div>
      <h1>Charity</h1>
      {mainConent}
    </div>

  )


}

export default Main












