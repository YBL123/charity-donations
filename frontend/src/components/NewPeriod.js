import React, { useState, useEffect } from 'react'

import PeriodForm from '../components/PeriodForm'

import { newPeriod } from '../lib/api'

const NewPeriod = ({ donorId }) => {

  const [formData, setFormDataState ] = useState({
    donorId: donorId,
    amount: '',
    method: ''
  })

  const handleChange = event => {
    setFormDataState({ ...formData, [event.target.name]: event.target.value }) 
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const request = {
        donor_id: formData.donorId,
        donation_details: {
          amount: formData.amount,
          method: formData.method
        }
      }
      const res = await newPeriod(request)

      if (res.status === 201) {
        console.log('new period created')
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
          <PeriodForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Proceed"
          />
    </div>

  )
}

export default NewPeriod
