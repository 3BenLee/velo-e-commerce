import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ShopHome />
      </BrowserRouter>
    );
  }
}

export default App;
