import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView';
import SimpleModalWrapped from './containers/ShoppingCartModal';

class App extends Component {

  state = {
    open: true, 
  };


  handleOpen = () => {
    console.log("cart clicked")
    this.setState({ open: true });
  };

  handleClose = () => {
    // console.log("cart clicked")
    this.setState({ open: false });
  };
  
  // shoppingCartHandler = () => {
  //   console.log("cart clicked")
  //   this.setState({ open: true });

  // }
  render() {
    return (
      <BrowserRouter>
      <div>
        <ButtonAppBar click={this.handleOpen} />
        <SimpleModalWrapped open={this.state.open}/>
        {/* { this.state.open ? <SimpleModalWrapped /> : null } */}
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
