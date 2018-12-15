import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './containers/StripeCheckoutForm';

const styles = {
  pageWrapper: {
    height: '100vh',
  } 
}

class App extends Component {

  render() {
    return (
      <div style={styles.pageWrapper}>
        <ButtonAppBar />
        <StripeProvider apiKey="pk_test_CewE8OaDETzJ42CKRkUZfobf">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
      </div>
    );
  }
}

export default App;
