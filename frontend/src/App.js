import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import charityLogo from 'https://animalcharityevaluators.org/wp-content/uploads/2016/09/animals-now-logo-icon-only.png'


import Main from './components/Main.js'
import MyDonations from'./components/MyDonations.js'


function App() {
  return (
    <div className="App">
      <div className='charity-header-wrap'>
      <img className="charity-logo" src={'https://animalcharityevaluators.org/wp-content/uploads/2016/09/animals-now-logo-icon-only.png'} alt='charitylogo' />
      <h1 className="charity-h1">Animal Sanctuary</h1>
      </div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/mydonations' component={MyDonations} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
