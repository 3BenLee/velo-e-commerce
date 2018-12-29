import React, { Component } from 'react';
import CheckoutForm from './StripeCheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';

class Checkout extends Component {
  render () {
    return ( 
      <div>
        <StripeProvider apiKey="pk_test_CewE8OaDETzJ42CKRkUZfobf">
          <div>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}

export default Checkout;

