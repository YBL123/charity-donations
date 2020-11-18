import React from 'react'


const DonorForm = ({ formData, handleChange, handleSubmit, buttonText }) => (
  <div className="columns">
    <form onSubmit={handleSubmit} className="">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            placeholder="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        {/* {errors.name && <small className="help is-danger">{errors.name}</small>} */}
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        {/* {errors.type && <small className="help is-danger">{errors.type}</small>} */}
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
          <input
            className="input"
            placeholder="card type"
            name="card_type"
            onChange={handleChange}
            value={formData.card_type}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Card Number</label>
        <div className="control">
          <input
            className="input"
            placeholder="card number"
            name="card_number"
            onChange={handleChange}
            value={formData.card_number}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Security Number</label>
        <div className="control">
          <input
            className="input"
            placeholder="3 digit number at the back of card"
            name="security_number"
            onChange={handleChange}
            value={formData.security_number}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Expiration Date</label>
        <div className="control">
          <input
            className="input"
            placeholder="expiration date"
            name="expiration_date"
            onChange={handleChange}
            value={formData.expiration_date}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Amount</label>
        <div className="control">
          <input
            className="input"
            placeholder="amount"
            name="amount"
            onChange={handleChange}
            value={formData.amount}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>
      <div className="field">
        <label className="label">Method</label>
        <div className="control">
          <input
            className="input"
            placeholder="method"
            name="method"
            onChange={handleChange}
            value={formData.method}
          />
        </div>
        {/* {errors.color && <small className="help is-danger">{errors.color}</small>} */}
      </div>

      <div className="field">
        <button type="submit" className="">{buttonText}</button>
      </div>
    </form>
  </div>
)

export default DonorForm