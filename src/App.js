import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView';

class App extends Component {

  render() {
    return (
      <div>
        <ButtonAppBar click={this.handleOpen} />
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
      </div>
    );
  }
}

export default App;
