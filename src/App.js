import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <ButtonAppBar />
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
