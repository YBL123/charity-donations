import React, { useState, useEffect } from 'react'
import { getSinglePeriod } from '../lib/api'

const Period = ({ donations }) => {

  const [periodState, setPeriodState] = useState({
    donation_details: {
      amount: '',
      method: ''
    }
  })
  const [viewConfigState, setViewConfigState] = useState({
    isLoggedIn: false,
    isLoading: true,
    isError: false,
    errMsg: '',
  })


  useEffect(() => {
    const fetchPeriod = async (periodId) => {
      try {
        const res = await getSinglePeriod(periodId)
        if (res.status === 200) {
          setPeriodState(res.data)
          setViewConfigState({...viewConfigState, isLoading: false})
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchPeriod(donations[0].donation_period_id)

  }, [])


  return (
    <tr>
    <td className="amount-in-table">
      {periodState.donation_details.amount}
    </td>
    <td className="method">
      {periodState.donation_details.method}
    </td>
    {donations.map((donation, index) => {
      return (
        <td key={`${index}${donation._id}`} className="donation-amount-per-day">{donation.donation_amount}</td>
      )
    })}
  </tr>
  )
}

export default Period
