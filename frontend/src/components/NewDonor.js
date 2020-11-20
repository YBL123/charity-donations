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
    setErrorsState({ ...errors, [event.target.name]: '' })
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
      if (!errorHandler(request)) {
        const res = await newDonor(request)
        if (res.status === 201) {
          await webhookTrigger()
          handleNewDonor({ donor_id: res.data.newDonor._id, name: res.data.newDonor.name })
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const errorHandler = (request) => {
    let isError = false

    //ERROR CHECK  
    const digits_only = string => [string].every(c => '0123456789'.includes(c))

    console.log(digits_only(request.payment_method.security_number))

    //CARD NUMBER
    if (digits_only(request.payment_method.card_number)) {
      isError = true
      setErrorsState({ ...errors, card_number: 'invalid card number' })
    } else if (request.payment_method.card_number.length <= 15 || request.payment_method.card_number.length > 16) {
      isError = true
      setErrorsState({ ...errors, card_number: 'invalid card number length' })
    } else {
      isError = false
    }
    //SECURITY NUMBER
    if (!digits_only(request.payment_method.security_number)) {
      isError = true
      setErrorsState({ ...errors, security_number: 'invalid security number' })
    }
    return isError
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
