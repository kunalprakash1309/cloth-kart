import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I3BBqLMDq0CqiZu70vemMop9dtqt96rYqmjHBomuA1vwmrjdqDv0G529u5fBuht18Az4wnxJLvZf0gw6yrBqW0Q00hhzo1mdQ'

    const token = () => {
        alert("Payment successful")
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CLOTH KART'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            stripeKey={publishableKey}
            token={token}
        />
    )
}

export default StripeCheckoutButton