import React from 'react'

const PeriodForm = ({ formData, handleChange, handleSubmit, buttonText }) => (

  <div className="period-form-page-wrap">
    <form onSubmit={handleSubmit} className="">
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
        {/* {errors.name && <small className="help is-danger">{errors.name}</small>} */}
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
        {/* {errors.name && <small className="help is-danger">{errors.name}</small>} */}
      </div>
      <button type="submit" className="period-form-button">{buttonText}</button>
    </form>
  </div>

)

export default PeriodForm
