const donations = [
  {
    periodId: 1,
    donation: 20
  },
  {
    periodId: 2,
    donation: 50
  },
  {
    periodId: 1,
    donation: 80
  },
  {
    periodId: 3,
    donation: 100
  },
  {
    periodId: 1,
    donation: 500
  }
]

const organisedPeriods = [[1], [2], [3]]

const organiseDonationsByPeriod = (donations) => {
  let periodArray = []
  let donationsCopy = [...donations]

  while (donationsCopy.length !== 0) {
    // FILTERING ARRAY AND RETURNING THE FIRST PERIOD
    const result = donationsCopy.filter(don => don.periodId === donationsCopy[0].periodId)
    periodArray.push(result)
    donationsCopy = donationsCopy.filter(don => don.periodId !== donationsCopy[0].periodId)
  }
  return periodArray
}

console.log(organiseDonationsByPeriod(donations))