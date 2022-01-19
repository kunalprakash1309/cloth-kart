import React from 'react'
import { Route, Switch, Redirect} from "react-router-dom"

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.componet';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { setCurrentUser } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import './App.css';



class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props

    // We need to add an observer to onAuthStateChanged to detect the initial state and subsequent state change
    // We can also use auth.currentUser but it is not persistent
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      else {
        setCurrentUser(userAuth)
      }
    })

    // called only ones
    // we are creatind important field in database i.e we are only sending title and items not id and route
    ///addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  

  render(){
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route 
              exact 
              path="/signin" 
              render={() => 
                this.props.currentUser 
                ? <Redirect to="/"/>
                : <SignInAndSignUp/>} 
            />

            {/* By using this method we cannot pass route props to its children
            <Route exact path="/signin" >
              {this.props.currentUser?<Redirect to="/" />: <SignInAndSignUp /> }
            </Route> */}

          </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
