import React, {Component} from 'react';
import { CardElement, injectStripe, } from 'react-stripe-elements';
// import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import getTotal from '../helpers/getTotal';
// import { FullscreenExit } from 'material-ui-icons';
// import { Card } from 'material-ui';

const cardElement = {
  base: {
    color: '#32325d',
    width: '50%',
    lineHeight: '30px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '25px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};
const styles = {
  wrapper: {
    textAlign: 'center'
  },
  checkoutTitle: {
    marginBottom: '30px'
  },
  unorderedList: {
    margin: '0 auto',
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    listStyleType: 'none',
    padding: '0'
  },
  // lineItemNames: {
  //   width: '50%'
  // },
  nameInputs: {
    display: 'inline-block',
    width: '100%',
    border: '2px solid #aab7c4',
    borderRadius: '6px',
  },
  // addressInputs: {
  //   display: 'inline-block',
  //   width: '50%',
  //   border: '2px solid #aab7c4',
  //   borderRadius: '6px',
  // },
  cardElement: {
    width: '50%',
    margin: 'auto',
    border: '2px solid #aab7c4',
    borderRadius: '6px'
  },
  button: {
    display: 'inline-block',
    margin: '30px auto 0 auto'
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
      <div style={styles.wrapper}>
        <h1 style={styles.checkoutTitle}>Checkout</h1>
        <ul style={styles.unorderedList}>
          <li style={styles.lineItemNames}>
            <input type="text" style={styles.nameInputs} name="firstname" placeholder="first name"></input>
          </li>
            <input type="text" style={styles.nameInputs} name="lastname" placeholder="last name"></input>
          <li style={styles.lineItemNames}>
            <input type="text" style={styles.addressInputs} name="address" placeholder="street address"></input>
          </li>
          <li>
            <input type="text" style={styles.addressInputs} name="city" placeholder="city"></input>
          </li>
          <li>
            <input type="text" style={styles.addressInputs} name="state" placeholder="state"></input>
          </li>
          <li>
            <input type="text" style={styles.addressInputs} name="state" placeholder="state"></input>
          </li>
          <li>
            <input type="text" style={styles.addressInputs} name="zip code" placeholder="zip code"></input>
          </li>
        </ul>
        <div style={styles.cardElement}>
          <CardElement style={cardElement}/>
        </div>
        <button style={styles.button} onClick={this.submit}>Submit Payment</button>
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
