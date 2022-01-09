import { CartActionTypes } from "./cart.types"

const toggleCartHidden = (action) => {
    return{
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    }
}

export default toggleCartHidden
