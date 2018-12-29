import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import getTotal from '../helpers/getTotal';
import { Container, Col, Form, FormGroup, Input } from 'reactstrap';
import './StripeCheckoutForm.css';

const cardElement = {
  base: {
    color: '#32325d',
    width: '50%',
    lineHeight: '30px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '18px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

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
    const total = getTotal(this.props.cartItems);
    const amount = total; // TODO: replace with form data
    const currency = 'USD';
    const response = await charge(token, amount, currency);

    if (response.statusCode === 200) {
      console.log('200!!',response);
    } else {
      console.error("error: ", response);
    }

    if (response.body) this.setState({complete: true});
  }

  render() {

    if (this.state.complete) return <h1 className="purchase-complete">Purchase Complete</h1>;

    return ( 
      <div className="checkout-wrapper"> 
      <Container className="App">
        <h2 class='text-center'>Let's Checkout</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Input
                  type="first name"
                  name="first name"
                  id="exampleEmail"
                  placeholder="first name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="last name"
                  name="last name"
                  id="exampleEmail"
                  placeholder="last name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="address"
                  name="address"
                  id="exampleEmail"
                  placeholder="address"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="city"
                  name="city"
                  id="exampleEmail"
                  placeholder="city"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="prefecture"
                  name="prefecture"
                  id="exampleEmail"
                  placeholder="prefecture"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="zipcode"
                  name="zipcode"
                  id="exampleEmail"
                  placeholder="zipcode"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <div className="card-element">
            {/* <CardElement style={cardElement}/> */}
            <CardElement style={cardElement}/>
            </div>
          </Form>
        <button className="checkout-button" onClick={this.submit}>Submit</button>
      </Container>
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
