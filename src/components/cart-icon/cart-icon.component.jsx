import React from 'react'
import { connect } from 'react-redux'

import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg'
import { selectCartItemsCount } from '../../redux/cart/cart-selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-icon.style.scss'

const CartIcon = ({toggleCartHidden, itemCounts}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCounts}</span>
    </div>
)

const mapStateToProps = state => {
    console.log("Inside cart-icon")
    return {
    itemCounts: selectCartItemsCount(state)
}}

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);