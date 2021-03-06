import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../actions/clearCartAction";
import getTotal from "../helpers/getTotalHelper";
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "./StripeCheckoutForm.css";
import validator from "validator";
import PaymentFailureModal from "./PaymentFailureModal";

/////// Styles for CardElement from Stripe ///////
const cardElement = {
  base: {
    color: "#32325d",
    width: "50%",
    lineHeight: "30px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "18px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

/////// Firebase Cloud Functions ///////
const FIREBASE_FUNCTION =
  "https://us-central1-velo-velo.cloudfunctions.net/charge/";

// Function used by all three methods to send the charge data to your Firebase function
async function charge(token, amount, currency) {
  const res = await fetch(FIREBASE_FUNCTION, {
    method: "POST",
    body: JSON.stringify({
      token,
      charge: {
        amount,
        currency
      }
    })
  });
  const data = await res.json();
  data.body = JSON.parse(data.body);
  return data;
}

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  state = {
    paymentComplete: false,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    prefecture: "",
    zipCode: "",
    email: "",
    submitDisabled: true,
    modalOpen: false
  };

  handleOpen = () => {
    // console.log("Cart Open", this.state.modalOpen);
    this.setState(
      {
        modalOpen: true
      },
      () => {
        setTimeout(this.handleClose, 3000);
      }
    );
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  handleChange = event => {
    // console.log('inputChange', value, event.target.name)
    event.preventDefault();
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.canSubmit
    );
  };

  canSubmit = () => {
    // console.log("canSubmit", this.state.submitDisabled)
    const {
      firstName,
      lastName,
      address,
      city,
      prefecture,
      zipCode,
      email
    } = this.state;
    if (
      validator.isAlpha(firstName) &&
      validator.isAlpha(lastName) &&
      address !== "" &&
      validator.isAlpha(city) &&
      validator.isAlpha(prefecture) &&
      !validator.isAlpha(zipCode) &&
      zipCode !== "" &&
      validator.isEmail(email)
    ) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  };

  clearCartHandler = () => {
    // console.log('clearCartHandler');
    this.props.onClearCart();
  };

  // User clicked submit
  async submit() {
    // console.log("clicked!")
    const { token } = await this.props.stripe.createToken({ name: "Name" });
    const total = getTotal(this.props.cartItems);
    const amount = total;
    const currency = "USD";
    const response = await charge(token, amount, currency);

    if (response.statusCode === 200) {
      this.setState({ paymentComplete: true });
      // console.log('200!!',response);
      this.clearCartHandler();
    } else {
      this.handleOpen();
      // alert("Please Check Card Information")
      // console.error("error: ", response);
    }
  }

  render() {
    if (this.state.paymentComplete) {
      return (
        <div className="purchase-complete-wrapper">
          <h1 className="purchase-complete-h1">Purchase Complete</h1>
          <Link to="/">
            <Button className="purchase-complete-button" color="secondary">
              Continue Shopping
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="checkout-wrapper">
        <Container className="App">
          <h2 className="text-center">Let's Checkout</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name={"firstName"}
                  value={this.state.firstName}
                  id="exampleEmail"
                  placeholder="first name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  id="exampleEmail"
                  placeholder="last name"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="address"
                  value={this.state.adress}
                  id="exampleEmail"
                  placeholder="address"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="city"
                  value={this.state.city}
                  id="exampleEmail"
                  placeholder="city"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="prefecture"
                  value={this.state.prefecture}
                  id="exampleEmail"
                  placeholder="prefecture"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="zipCode"
                  value={this.state.zipCode}
                  id="exampleEmail"
                  placeholder="zipcode"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  value={this.state.email}
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            {/* <Button className="save-address-button" disabled={this.state.submitDisabled}>Submit Address</Button> */}
            <div className="card-element">
              <CardElement style={cardElement} />
            </div>
          </Form>
          <button
            className="checkout-button"
            disabled={this.state.submitDisabled}
            onClick={this.submit}
          >
            Submit
          </button>
        </Container>
        <PaymentFailureModal open={this.state.modalOpen} toggle={this.toggle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.shoppingCart.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearCart: () => dispatch(clearCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(CheckoutForm));
