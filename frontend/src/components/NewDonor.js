import React, { useState, useEffect } from 'react'
import { newDonor } from '../lib/api'

import DonorForm from './DonorForm'


const NewDonor = (props) => {

  const [formData, setFormDataState ] = useState({
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
  const {handleNewDonor} = props

  const handleChange = event => {
    // const errors = { ...errors, [event.target.name]: ''} // shouldn't go here
    console.log(event.target.value)
    setFormDataState({ ...formData, [event.target.name]: event.target.value }) //add errors back in later 
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
      console.log('res in newDonor', res)
      setCookie(res)
      handleNewDonor(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  


    return (
      <section className="section">
        <div className="container">
          <DonorForm
            formData={formData}
            // errors={this.state.errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Proceed"
          />
        </div>
      </section>
    )

}


export default NewDonor
