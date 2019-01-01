import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../actions/clearCartAction';
import getTotal from '../helpers/getTotalHelper';
import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import './StripeCheckoutForm.css';
import validator from 'validator';

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
    paymentComplete: false,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    prefecture: '',
    zipCode: '',
    email: '',
    submitDisabled: true
  }

  inputChangeHandler = (event) => {
    console.log('inputChange', [event.target.name], event.target.value)
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    }, console.log(this.state.submitDisabled), function(){ this.canSubmit() })
  }

  canSubmit = () => {
    console.log("canSubmit")
    const { firstName, lastName, address, city, prefecture,zipCode, email} = this.state
    // if (validator.isAlpha(firstName) 
    // && validator.isAlpha(lastName) 
    // && address > 0
    // && validator.isAlpha(city)
    // && validator.isAlpha(prefecture)
    // && zipCode > 0
    if (validator.isEmail(email)) {
    // && validator.isEmail(email)) {
      this.setState({submitDisabled: false})
    } else {
      this.setState({submitDisabled: true})
    }
  }

  clearCartHandler = () => {
    console.log('clearCartHandler');
    this.props.onClearCart()
  }

  // User clicked submit
  async submit(ev) {
    console.log("clicked!")
    const {token} = await this.props.stripe.createToken({name: "Name"});
    const total = getTotal(this.props.cartItems);
    const amount = total; // TODO: replace with form data
    const currency = 'USD';
    const response = await charge(token, amount, currency);

    if (response.statusCode === 200) {
      this.setState({paymentComplete: true});
      console.log('200!!',response);
      this.clearCartHandler();

    } else {
      alert("wrong credit information")
      console.error("error: ", response);
    }
  }

  render() {

    if (this.state.complete) {
      return (
        <div>
          <h1 className="purchase-complete">Purchase Complete</h1>
          <Link to='/'>
            <button>Continue Shopping</button>
          </Link>
        </div>
      );
    }
      
    return ( 
      <div className="checkout-wrapper"> 
      <Container className="App">
        <h2 className='text-center'>Let's Checkout</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Input
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
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
                  onChange= {this.inputChangeHandler}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <Button className="save-address-button" disabled={this.state.submitDisabled}>Submit Address</Button>
            <div className="card-element">
            <CardElement style={cardElement}/>
            </div>
          </Form>
        <button className="checkout-button" disabled={false} onClick={this.submit}>Submit</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCart: () => dispatch(clearCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));
