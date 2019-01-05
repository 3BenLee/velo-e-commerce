import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ItemDetailView from './containers/ItemDetailView';
import Checkout from './containers/Checkout';
import 'bootstrap/dist/css/bootstrap.css';
import ShopNavbar from './components/ShopNavbar';

class App extends Component {

  render() {
    return (
      <div>
        {/* <ButtonAppBar /> */}
        <ShopNavbar />
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
        <Route exact path="/checkout" component={Checkout} />
      </div>
    );
  }
}

export default App;
