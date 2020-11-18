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

  const getDonations = async (donorId) => {
    let res = await getAllDonations()
    console.log('getDonations', res)

    if (res.status === 200) {
      setDonationsState(res)
      setViewConfigState({ ...viewConfigState, isLoading: false })

      const donations = res.data.map(donation => {
        return <h1>donation</h1>
      })
      // return donations
      console.log('donations',donations)
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
      {viewConfigState.isLoading ? null : donationsState.donations}
      {/* {vieConfigState.isError ? errMsg : null} */}
      <Link to='/'> Make another donation? </Link>
    </div>
  )
}

export default MyDonations
