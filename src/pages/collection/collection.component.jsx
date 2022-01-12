import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.style.scss'

const CollectionPage = ({collection}) => {

    return(
    <div className='collection-page'>
        <h2>CategoryPage</h2>
    </div>
)}

// here ownProps is the props which being passed in CollectionPage from its parent component

// Now we are passing two arguements becuase :-
// Firstly, selectCollection accept collectionId
// Secondly, selectCollection accept state for createSelector
// "selectCollection(ownProps.match.params.collectionId)(state)" this is called Currying
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)