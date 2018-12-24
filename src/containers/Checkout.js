import React, { Component } from 'react';
import CheckoutForm from './StripeCheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';

class Checkout extends Component {
  render () {
    return (
      <StripeProvider apiKey="pk_test_CewE8OaDETzJ42CKRkUZfobf">
        <div className="example">
          <h1>Checkout</h1>
          <input placeholder="Cardholder"></input>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default Checkout;

