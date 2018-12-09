import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ShopHome from './containers/ShopHome';
import ButtonAppBar from './components/ButtonAppBar';
import ItemDetailView from './containers/ItemDetailView';


const styles = {
  pageWrapper: {
    height: '100vh',
    backgroundColor: 'grey'
  } 
}

class App extends Component {

  render() {
    return (
      <div style={styles.pageWrapper}>
        <ButtonAppBar />
        <Route exact path="/" component={ShopHome} />
        <Route exact path="/detail/:id" component={ItemDetailView} />
      </div>
    );
  }
}

export default App;
