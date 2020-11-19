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
    peiodId: 1,
    donation: 500
  }
]

const organisedPeriods = [[1], [2], [3]]

const organiseDonationsByPeriod = (donations) => {
  let periodArray = []

  // periodArray['hello'] = { periodId: 1, donation: 20 }

  // return periodArray

  donations.map((donation, index) => {
    if (periodArray ) {

    }
  })
}

console.log(organiseDonationsByPeriod(donations))