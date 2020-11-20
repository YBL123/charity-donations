import React from 'react'


const DonorForm = ({ formData, errors, prefillPayment, handleChange, handleSubmit, buttonText }) => (

  <div className="donor-form-wrap">
    <form onSubmit={handleSubmit} className="">

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            placeholder="John Smith"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        {/* {errors.name && <small className="form-input-empty">{errors.name}</small>} */}
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            placeholder="johnsmith@gmail.com"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        {/* {errors.type && <small className="help is-danger">{errors.type}</small>} */}
      </div>
      <div className="field">
        <label className="label">Donation Amount in £</label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="i.e 50"
            name="amount"
            onChange={handleChange}
            value={formData.amount}
          />
        </div>
        {errors.amount !== '' ? <small className="help is-danger">{errors.amount}</small> : null }
      </div>
      <div className="field">
        <label className="label">Payment Method (equal or more-odd)</label>
        <div className="control">
          <select className="form-select" value={formData.method} onChange={handleChange} name="method">
            <option></option>
            <option value="equal">equal</option>
            <option value="more-odd">more-odd</option>
          </select>
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <br />
      <h3 className="donor-form-payment-section-h3">Payment Section:</h3>
      <div className="prefill-button-wrap">
        <div className="prefill-button" onClick={prefillPayment}>Prefill Payment Details</div>
        </div>
      <div className="field">
        <label className="label">Name On Card</label>
        <div className="control">
          <input
            className="input"
            placeholder="name on card"
            name="name_on_card"
            onChange={handleChange}
            value={formData.name_on_card}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Card Type</label>
        <div className="control">
          <select className="form-select" value={formData.card_type} onChange={handleChange} name="card_type">
            <option></option>
            <option value="visa debit">visa debit</option>
            <option value="visa credit">visa credit</option>
            <option value="master card">master card</option>
            <option value="american express">american express</option>
          </select>
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Card Number</label>
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="long number on the front of your card"
            name="card_number"
            onChange={handleChange}
            value={formData.card_number}
          />
        </div>
        {errors.card_number !== '' ? <small className="help is-danger">{errors.card_number}</small> : null }
      </div>
      <div className="field">
        <label className="label">Security Number</label>
        <div className="control">
          <input
            className="input"
            placeholder="3 digit number on the back of your card"
            name="security_number"
            onChange={handleChange}
            value={formData.security_number}
          />
        </div>
        {errors.security_number !== '' ? <small className="help is-danger">{errors.security_number}</small> : null }
      </div>
      <div className="field">
        <label className="label">Expiration Date</label>
        <div className="control">
          <input
            className="input"
            placeholder="your card's expiration date"
            name="expiration_date"
            onChange={handleChange}
            value={formData.expiration_date}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>


      <div className="field">
        <button type="submit" className="donor-form-button">{buttonText}</button>
      </div>
    </form>
  </div>
)

export default DonorForm