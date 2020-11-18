import React, { useState, useEffect } from 'react'

import NewDonor from './NewDonor'

import { getCookie, clearAllCookies, setCookie } from '../lib/cookies'

const Main = () => {

  const [donorsState, setDonorsState] = useState({})

  useEffect(() => {

    //CHECKING IF COOKIE EXITS -> if it does setDonorState
    const donor = getCookie('donor')
    if (donor !== '') {
      setDonorsState(donor)
    }

  }, [])


  // ONCE DONOR HAS BEEN CREATED SETDONORSTATE WITH DONORID
  const handleNewDonor = (donor) => {

    setDonorsState(donor)

    setCookie('donor', donor, 30)
  }

  // CLEARS ALL COOKIES WHEN LOGGING OUT DONOR
  const logOutDonor = () => {
    clearAllCookies()
    setDonorsState('')
  }

  // THIS CONTENT WILL APPEAR IF A DONOR HAS ALREADY MADE A DONATION/ LOGGED IN
  let subContent = (
    <div>
      <button>Make New Donation Period</button>
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












