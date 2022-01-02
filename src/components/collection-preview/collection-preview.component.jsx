import React from 'react'

import CollectionItem from '../collection-item/collection-item.component'
import "./collection-preview.style.scss"

const CollectionPreview = ({title,items}) => (
    <div className='collection-preview'>
        <h1 className='title' >{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                // all of these anonymous function calls inside any component 
                // do get called again and rerendered brand new whenever this 
                // component rendered or rerendered
                items.filter((item,idx) => idx<4)
                .map(({id, ...otherItemProps}) => (
                    <CollectionItem key={id} {...otherItemProps} />
                ))
            }
        </div>
    </div>
)

export default CollectionPreview