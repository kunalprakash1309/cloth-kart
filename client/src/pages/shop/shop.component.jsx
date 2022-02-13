import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'


//import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import CollectionOvervieContainer from '../../components/collection-overview/collection-overview.container'
import CollectionPageContainer from '../collection/collection.container'



// complete code is shifted to collection-overview component because now we need to 
// add respective shop page(i.e hats, mens, etc). Because until now ShopPage only render
// Collection-prieview component

// need to change from fumctional to class component to store and fetch shot data from firestore and pass it to its children
const ShopPage = ({ match, fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart])

    // componentDidMount() {

    //     const {fetchCollectionsStart} = this.props
    //     fetchCollectionsStart()

    //     //one of the way of doing
    //     // here snapShot is document snapshot of collections.
    //     // onSnapshot gives snapshot of inside docs of collectionsRef and property like docs, empty and size etc 
    //     // collectionRef.onSnapshot(async snapShot => {

    //     //     // Then we passing all docs snapshot to below function which present in firebase.utils.js 
    //     //     // In simple term, we are passing whole docs refrence present in collectins collection
    //     //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
    //     //     updateCollections(collectionsMap)
    //     //     this.setState({
    //     //         loading: false
    //     //     })
    //     // })
    // }


    return (
        <div className='shop-page' >
            <Route exact path={`${match.path}`} component={CollectionOvervieContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    )
}


const mapDispathToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispathToProps)(ShopPage)