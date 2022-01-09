import React from 'react'
import { Link } from "react-router-dom"

import {connect} from 'react-redux'

import { auth } from '../../firebase/firebase.utils'

import "./header.style.scss"

import {ReactComponent as Logo} from "../../assests/crown.svg"
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'


const Header = ({currentUser, hidden}) => (
    <div className='header'>
		<Link className='logo-container' to='/'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>
			SHOP
			</Link>
			<Link className='option' to='/shop'>
			CONTACT
			</Link>
			{
				currentUser ? 
				(
					<div className='option' onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				)
				:
				(
					<Link className='option' to='/signin'>
					SIGN IN
					</Link>
				)
			}
			<CartIcon />
		</div>
		{
			hidden ? null: <CartDropdown/>
		}
    </div>
);

// state is being passed from connect which is a HOC
const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	hidden: state.cart.hidden
	// random: state.cart.hidden another way of writing also
})

// connect is HOC which helps to connect component with reducer and store
export default connect(mapStateToProps)(Header);