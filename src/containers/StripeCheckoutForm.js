import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
// import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import getTotal from '../helpers/getTotal';
// import { Card } from 'material-ui';

const createOptions = (style) => {
  return {
    style: {
      base: {
        style,
        color: 'blue',
        width: '60px',
        display: 'block',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

const styles = {
  card: {
    position: 'relative',
    width: '100%',
    color: 'green'
  }
}

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
      console.log('200!!',response);
    } else {
      console.error("error: ", response);
    }

    if (response.body) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div style={styles.card} className="checkout">
        {/* <CardElement {...createOptions(this.props.fontSize)}/>        */}
        <CardElement {...createOptions()}/>
        <button onClick={this.submit}>Submit Payment</button>
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
