import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

import './cart-dropdown.style.scss'

import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { selectCartItems } from '../../redux/cart/cart-selectors'

const CartDropdown = ({cartItems, history,dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {   
                cartItems.length ?
                (cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem}/>))) :
                (<span className='empty-message'>Your cart is empty</span>)
            }
        </div>
        <CustomButton 
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden())
                }} >
            GO TO CHECKOUT
        </CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

// one of the method
// other method :- Whenever we use connect and if we not provide mapDispatchToProps connect provides dispatch method as a props to its component
// used for not writing mapDispatchToProps for little work
// const mapDispatchToProps = dispatch => ({
//     toggleCartHidden: () => dispatch(toggleCartHidden())
// })

export default withRouter(connect(mapStateToProps)(CartDropdown))