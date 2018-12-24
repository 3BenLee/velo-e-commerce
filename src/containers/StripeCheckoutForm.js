import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux';
import getTotal from '../helpers/getTotal';

const FIREBASE_FUNCTION = 'https://us-central1-velo-velo.cloudfunctions.net/charge/';

// Function used by all three methods to send the charge data to your Firebase function
async function charge(token, amount, currency) {
  const res = await fetch(FIREBASE_FUNCTION, {
      method: 'POST',
      body: JSON.stringify({
          token,
          charge: {
              amount,
              currency,
          },
      }),
  });
  const data = await res.json();
  data.body = JSON.parse(data.body);
  return data;
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  state = {
    complete: false
  }
  // User clicked submit
  async submit(ev) {
    const {token} = await this.props.stripe.createToken({name: "Name"});
    // let response = await fetch("https://us-central1-velo-velo.cloudfunctions.net/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });
    const total = getTotal(this.props.cartItems);
    const amount = total; // TODO: replace with form data
    const currency = 'USD';
    const response = await charge(token, amount, currency);
  
    // if (response.ok) console.log("Purchase Complete!");
    // if (response.ok) this.setState({complete: true});
    if (response.statusCode === 200) {
      console.log(response);
    } else {
      console.error("error: ", response);
    }

    if (response.body) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.shoppingCart.cartItems
  }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm));