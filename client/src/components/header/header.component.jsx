import React from 'react'

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.style'

import {ReactComponent as Logo} from "../../assests/crown.svg"
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart-selectors'

import { signOutStart } from '../../redux/user/user.actions'


const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
		<LogoContainer to='/'>
			<Logo  />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>
			SHOP
			</OptionLink>
			<OptionLink  to='/shop'>
			CONTACT
			</OptionLink>
			{
				currentUser ? 
				(
					<OptionLink as='div' onClick={signOutStart}>
						SIGN OUT
					</OptionLink>
				)
				:
				(
					<OptionLink to='/signin'>
					SIGN IN
					</OptionLink>
				)
			}
			<CartIcon />
		</OptionsContainer>
		{
			hidden ? null: <CartDropdown/>
		}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart())
})

// state is being passed from connect which is a HOC
// const mapStateToProps = state => ({
// 	currentUser: selectCurrentUser(state),
// 	hidden: selectCartHidden(state)
// 	// random: state.cart.hidden another way of writing also
// })

// connect is HOC which helps to connect component with reducer and store
export default connect(mapStateToProps, mapDispatchToProps)(Header);