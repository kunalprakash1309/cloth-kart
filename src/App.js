import React from 'react'
import { Route, Switch} from "react-router-dom"

import Homepage from './pages/homepage/homepage.componet';
import './App.css';

const Hats = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  )
}

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/hats" component={Hats} />
        </Switch>
    </div>
  )
}

export default App;
