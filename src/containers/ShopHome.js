import React, { Component } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  } 
}

class ShopHome extends Component {

  state = {
    cards: []
  }

  componentDidMount () {
    axios.get('https://velo-velo.firebaseio.com/.json')
      .then(response => {
        this.setState({cards: response.data});
        //console.log('&', response);
      });
  }
  
  render() {

    let cards = Object.values(this.state.cards).map(cards => {
      //console.log('%', cards);
      return <ItemCard 
      key={cards.title}
      id={cards.id} 
      title={cards.title}
      price={cards.price}
      image={cards.img} 
      description={cards.description}/>
    });

    return (
     
          <div style={styles.wrapper}>
            {cards}
          </div>
    )
  }
}

export default ShopHome;
