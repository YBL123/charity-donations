import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import { getCookie } from '../lib/cookies'

import { getDonorDonations } from '../lib/api'


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


  console.log('donationsState', donationsState)


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
      {donationsState.map((donation, index) => {
        return (
          // <Donation key={index} donation={donation} />
          <div key={index}>
            donation
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <h1>My Donations</h1>
      {viewConfigState.isLoading ? null : printDonations}
      {/* {vieConfigState.isError ? errMsg : null} */}
      <Link to='/'> Make another donation? </Link>
    </div>
  )
}

export default MyDonations
