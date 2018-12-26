import React, { Component } from 'react';
import CheckoutForm from './StripeCheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';

const styles = {
  checkoutWrapper: {
    display: 'flex',
    width: "100%",
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  checkoutTitle: {
    width: '10%',
    display: 'block'
  },
  checkoutForm: {
    width: '70%'
  }
}

class Checkout extends Component {
  render () {
    return ( 
      <div>
        <h1 style={styles.checkoutTitle}>Checkout</h1>
        <StripeProvider apiKey="pk_test_CewE8OaDETzJ42CKRkUZfobf">
          <div style={styles.checkoutWrapper}>
            {/* <input placeholder="Cardholder"></input> */}
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

