import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        console.log('&', response);
        console.log("#", this.props)
      });
  }

  ShowItemDetailHandler = (id) => {
    this.props.history.push(`detail/${this.props.id}`)
  }
  
  render() {

    let cards = Object.values(this.state.cards).map(cards => {
      //console.log('%', cards);
      return (
      <Link to={'/detail/' + cards.id} key={cards.id}>
        <ItemCard 
        key={cards.title}
        id={cards.id} 
        title={cards.title}
        price={cards.price}
        image={cards.img} 
        description={cards.description}
        clicked={() => this.ShowItemDetailHandler(cards.id)}
        />
      </Link>)
    });

    return (
      <div style={styles.wrapper}>
        {cards}
      </div>
    )
  }
}

export default ShopHome;
