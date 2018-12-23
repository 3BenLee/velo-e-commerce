import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

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

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: "Name"});
    // let response = await fetch("https://us-central1-velo-velo.cloudfunctions.net/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });
    const amount = 100; // TODO: replace with form data
    const currency = 'USD';
    let response = await charge(token, amount, currency);
  
    // if (response.ok) console.log("Purchase Complete!");
    // if (response.ok) this.setState({complete: true});
    if (response.headers.statusCode === 200) {
      console.log("Purchase Complete!");
    } else {
      console.error("error: ", response);
    }

    if (response.body) this.setState({complete: true});
  }

  render() {

    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);