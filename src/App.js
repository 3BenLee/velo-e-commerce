import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView';
import Checkout from './containers/Checkout';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  render() {
    return (
      <div>
        <ButtonAppBar />
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
        <Route exact path="/checkout" component={Checkout} />
      </div>
    );
  }
}

export default App;
