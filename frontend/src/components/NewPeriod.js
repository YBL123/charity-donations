import React, { useState, useEffect } from 'react'

import PeriodForm from '../components/PeriodForm'

import { newPeriod, webhookTrigger } from '../lib/api'

const NewPeriod = ({ donorId }) => {

  const [formData, setFormDataState ] = useState({
    donorId: donorId,
    amount: '',
    method: ''
  })

  console.log(formData)

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
      console.log(request)
      const res = await newPeriod(request)

      if (res.status === 201) {
        console.log('new period created')
        await webhookTrigger()
        //RESETS FORM INPUT ONCE ANOTHER DONATION HAS BEEN MADE
        setFormDataState({...formData, amount: '', method: ''} )
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
