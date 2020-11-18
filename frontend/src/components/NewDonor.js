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
    expiration_date: ''
  })
  const {handleNewDonor} = props

  const handleChange = event => {
    // const errors = { ...errors, [event.target.name]: ''} // shouldn't go here
    setFormDataState({ ...formData, [event.target.name]: event.target.value }) //add errors back in later 
  }

  const handleSubmit = async event => {
    event.preventDefault()
    
    try {
      const res = await newDonor(formData) 
      handleNewDonor(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }


    return (
      <section className="section">
        <div className="container">
          <DonorForm
            formData={formData}
            // errors={this.state.errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Make Donation"
          />
        </div>
      </section>
    )

}


export default NewDonor
