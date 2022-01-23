import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import CollectionOverview from '../../components/collection-overview/collection.overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'


import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)




// complete code is shifted to collection-overview component because now we need to 
// add respective shop page(i.e hats, mens, etc). Because until now ShopPage only render
// Collection-prieview component

// need to change from fumctional to class component to store and fetch shot data from firestore and pass it to its children
class ShopPage extends React.Component{


    componentDidMount() {

        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()

        //one of the way of doing
        // here snapShot is document snapshot of collections.
        // onSnapshot gives snapshot of inside docs of collectionsRef and property like docs, empty and size etc 
        // collectionRef.onSnapshot(async snapShot => {

        //     // Then we passing all docs snapshot to below function which present in firebase.utils.js 
        //     // In simple term, we are passing whole docs refrence present in collectins collection
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
        //     updateCollections(collectionsMap)
        //     this.setState({
        //         loading: false
        //     })
        // })
    }

    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props
        return (
            <div className='shop-page' >
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} /> } />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionsFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})
const mapDispathToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispathToProps)(ShopPage)