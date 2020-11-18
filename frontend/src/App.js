import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Main from './components/Main.js'
import MyDonations from'./components/MyDonations.js'


function App() {
  return (
    <div className="App">
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
