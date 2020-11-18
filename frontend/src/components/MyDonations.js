import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import { getCookie } from '../lib/cookies'

import { getAllDonations } from '../lib/api'



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


  useEffect(() => {
    const donor = getCookie('donor')
    const donorId = getCookie('donor_id')
    if (donor !== '') {
      setDonorsState({ donor: donor, name: donorId })
    }
    //if no cookie -> history.push('/)
    if (!donor) {
      history.push('/')
    }

    setViewConfigState({ ...viewConfigState, isLoggedIn: true })

  }, [])

  const getDonations = async () => {
    let res = await getAllDonations()

    if (res.status === 200) {
      setDonationsState(res)
      setViewConfigState({ ...viewConfigState, isLoading: false })

      const donations = res.data.map(donation => {
        console.log('donation', donation.donation_amount)
        return donation.donation_amount
      })

      setDonationsState(donations)
      console.log(donationsState)

      return donations

    }

  }

  useEffect(() => {
    if (viewConfigState.isLoggedIn) {

      const donorId = getCookie('donor_id')


      getDonations(donorId)


    }

  }, [viewConfigState.isLoggedIn, donorsState.donorId])



  return (
    <div>
      <h1>My Donations</h1>
      {/* {viewConfigState.isLoading ? null : donationsmap} */}
      {/* {vieConfigState.isError ? errMsg : null} */}
      <Link to='/'> Make another donation? </Link>
    </div>
  )
}

export default MyDonations
