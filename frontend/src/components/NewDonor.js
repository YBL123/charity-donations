import React, { useState, useEffect } from 'react'
import { newDonor, webhookTrigger } from '../lib/api'

import DonorForm from './DonorForm'


const NewDonor = (props) => {

  const { handleNewDonor } = props

  const [formData, setFormDataState] = useState({
    name: '',
    email: '',
    name_on_card: '',
    card_type: '',
    card_number: '',
    security_number: '',
    expiration_date: '',
    amount: '',
    method: ''
  })
  
  const [errors, setErrorsState] = useState({
    name: '',
    email: '',
    name_on_card: '',
    card_type: '',
    card_number: '',
    security_number: '',
    expiration_date: '',
    amount: '',
    method: ''
  })

  const handleChange = event => {
    setErrorsState({ ...errors, [event.target.name]: ''}) 
    setFormDataState({ ...formData, [event.target.name]: event.target.value })  
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const request = {
        name: formData.name,
        email: formData.email,
        payment_method: {
          name_on_card: formData.name_on_card,
          card_type: formData.card_type,
          card_number: formData.card_number,
          security_number: formData.security_number,
          expiration_date: formData.expiration_date
        },
        donation_details: {
          amount: formData.amount,
          method: formData.method,
        }
      }
      const res = await newDonor(request)
      if (res.status === 201) {
        await webhookTrigger()
        handleNewDonor({ donorId: res.data.newDonor._id, name: res.data.newDonor.name })
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <section className="section">
      <div className="container">
        <DonorForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Proceed"
        />
      </div>
    </section>
  )

}


export default NewDonor
