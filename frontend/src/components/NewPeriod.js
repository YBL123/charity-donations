import React, { useState, useEffect } from 'react'

import PeriodForm from '../components/PeriodForm'

import { newPeriod, webhookTrigger } from '../lib/api'

import { Link } from 'react-router-dom'

const NewPeriod = ({ donorsState, logOutDonor }) => {

  const [formData, setFormDataState] = useState({
    donor_id: '',
    amount: '',
    method: ''
  })
  const [viewConfigState, setViewConfigState] = useState({
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    errMsg: '',
  })

  useEffect(() => {
    if (donorsState.donor_id !== undefined) {
      setFormDataState({...formData, donor_id: donorsState.donor_id})
      setViewConfigState({ ...viewConfigState, isLoading: false })
    }
  }, [donorsState.donor_id])

  console.log(formData) ////////

  const handleChange = event => {
    setFormDataState({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const request = {
        donor_id: formData.donor_id,
        donation_details: {
          amount: formData.amount,
          method: formData.method
        }
      }
      console.log('request', request) ////////////
      const res = await newPeriod(request)

      console.log('this is res in newPeriod', res) ////////////

      if (res.status === 201) {
        console.log('new period created')
        await webhookTrigger()
        //RESETS FORM INPUT ONCE ANOTHER DONATION HAS BEEN MADE
        setFormDataState({ ...formData, amount: '', method: '' })
      }
    } catch (err) {
      console.log(err)
    }
  }

  let mainContent = (
    <div className="subcontent-message-wrap">
      <div className="subcontent-wrap">
        <h2>Hi, {donorsState.name} </h2>
        <h3>Thank you for your donation!</h3>
        <h3>Would you like to make another donation?</h3>
        <Link to='/mydonations' className="check-your-donations-link"> Check your donations </Link>
        <div>
          <PeriodForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Proceed"
          />
        </div>
        <p className="logout-link" onClick={logOutDonor}>Log out</p>
      </div>
    </div>
  )


  return (
    <div>
      { viewConfigState.isLoading ? null : mainContent }
    </div>
  )
}

export default NewPeriod
