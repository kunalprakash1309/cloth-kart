import { createSelector } from 'reselect'

// input selector
const selectCart = state => state.cart

// createSelector accepts one or more input selectors which extract values from arguments,
// and an "output selector that recieve the extracted values and should return a derived value"
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity,0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0)
)