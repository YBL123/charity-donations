import React, { useState, useEffect } from 'react'

import NewDonor from './NewDonor'

import { getAllPeriods } from '../lib/api'

const Main = () => {

  const [donorsState, setDonorsState] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await getAllPeriods()
        console.log('all periods', res)
        let periods = []
        res.data.map(period => {
          periods.push({
            periodId: period._id
          })
        })
        setDonorsState(periods)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
      fetchDonors()

  }, [])

  const handleNewDonor = (newDonor) => {
    let newDonorsArray = [...donorsState]

    console.log('newDonor', newDonor)

    newDonorsArray.push({
      // donorId: newDonor._id,
      name: newDonor.name,
      email: newDonor.email,
      payment_method: {
        name_on_card: newDonor.name_on_card,
        card_number: newDonor.card_number,
        security_number: newDonor.security_number,
        expiration_date: newDonor.expiration_date
      }
    })
    setDonorsState(newDonorsArray)
  }

  return (
    <div>
      <h1>hello</h1>
      <NewDonor handleNewRover={handleNewDonor} />
    </div>

  )


}

export default Main












