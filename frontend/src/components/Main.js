import React, { useState, useEffect } from 'react'

import NewDonor from './NewDonor'

import { getAllPeriods } from '../lib/api'

const Main = () => {

  const [donorsState, setDonorsState] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleNewDonor = (newDonor) => {
    let newDonorsArray = [...donorsState]

    console.log('newDonor', newDonor)

    newDonorsArray.push(newDonor)
    
    setDonorsState(newDonorsArray)
  }

  return (
    <div>
      <h1>Charity</h1>
      <NewDonor handleNewRover={handleNewDonor} />
    </div>

  )


}

export default Main












