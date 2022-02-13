import React from 'react'
import { connect } from 'react-redux'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.style.scss'

const CollectionPage = ({collection}) => {

    // example of useffect in componentWillUnmount
    // useEffect(() => {
    //     console.log('I am subscribing')
    //     const unsubscribe = firestore.collection('collections').onSnapshot(snapshot => console.log(snapshot))

    // this works as unsubscribing function
    //     return () => {
    //         console.log('I am unsubscribing')
    //         unsubscribe()
    //     }
    // }, [])

    const { title, items } = collection
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => <CollectionItem key={item.id} item={item} />)
            }
        </div>
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