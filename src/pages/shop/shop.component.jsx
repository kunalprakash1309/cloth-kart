import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CollectionOverview from '../../components/collection-overview/collection.overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils'

import updateCollections from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)




// complete code is shifted to collection-overview component because now we need to 
// add respective shop page(i.e hats, mens, etc). Because until now ShopPage only render
// Collection-prieview component

// need to change from fumctional to class component to store and fetch shot data from firestore and pass it to its children
class ShopPage extends React.Component{
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props
        // it only gets the refrence of collections collection
        const collectionRef = firestore.collection('collections')

        // here snapShot is document snapshot of collections.
        // onSnapshot gives snapshot of inside docs of collectionsRef and property like docs, empty and size etc 
        collectionRef.onSnapshot(async snapShot => {

            // Then we passing all docs snapshot to below function which present in firebase.utils.js 
            // In simple term, we are passing whole docs refrence present in collectins collection
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
            updateCollections(collectionsMap)
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const { match } = this.props
        const { loading } = this.state
        return (
            <div className='shop-page' >
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
            </div>
        )
    }
}

const mapDispathToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispathToProps)(ShopPage)