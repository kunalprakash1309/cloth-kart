import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5,
}

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// it takes one upper layer of required state[i.e selectCollections(Collections)] and 
// pass it passes itself as a second paramter[i.e collection => ]
// But in this different selector we are passing parameter[i.e collectionUrlParam] to handle this
// we have to call it using currying (also refer )
// selectionCollection first accept URL-Param and return another function[i.e createSelector] 
// which accept state as a parameter
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => 
            collections.find(
                collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
            )
    )