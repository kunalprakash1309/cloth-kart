import React from 'react'
import { Route, Switch} from "react-router-dom"

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.componet';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // We need to add an observer to onAuthStateChanged to detect the initial state and subsequent state change
    // We can also use auth.currentUser but it is not persistent
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  

  render(){
    console.log(this.state.currentUser)
    return (
      <div>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/signin" component={SignInAndSignUp} />
          </Switch>
      </div>
    )
  }
}

export default App;
