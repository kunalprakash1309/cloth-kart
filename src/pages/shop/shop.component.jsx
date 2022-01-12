import React from 'react'
import { Route } from 'react-router-dom'

import CollectionOverview from '../../components/collection-overview/collection.overview.component'
import CollectionPage from '../collection/collection.component'

import "./shop.style.scss"

// complete code is shifted to collection-overview component because now we need to 
// add respective shop page(i.e hats, mens, etc). Because until now ShopPage only render
// Collection-prieview component

const ShopPage = ({match}) => (
    <div className='shop-page' >
        <Route exact path={`${match.path}`} component={CollectionOverview}/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)

export default ShopPage