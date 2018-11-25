import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMerch } from '../actions/fetchMerchAction';
// import axios from 'axios';
import ItemCard from './ItemCard';

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  } 
}

class ShopHome extends Component {

  componentDidMount() {
    this.props.fetchMerch();
    console.log('%', this.props.cards);
  }

  // state = {
  //   cards: []
  // }

  // componentDidMount () {
  //   axios.get('https://velo-velo.firebaseio.com/.json')
  //     .then(response => {
  //       this.setState({cards: response.data});
  //       console.log('&', response);
  //       console.log("#", this.props)
  //     });
  // }

  // ShowItemDetailHandler = (id) => {
  //   this.props.history.push(`detail/${this.props.id}`)
  // }
  
  render() {
    // changed this.state.cards to this.props.cards because I'm using redux
    let cards = this.props.cards ? <p>Ingredients can't be loaded!</p> : <ItemCard />;

    if (cards === this.props.cards ){
      const cards = Object.values(cards).map(cards => {
      
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
      
    }
    return (
      <div style={styles.wrapper}>
        {cards}
      </div>
    )
    

    
  

  }
}

const mapStateToProps = state => {
  console.log("map props to state")
  console.log("----->",state.data.cardData)
  return {
    // state is received in the form of props
   
    cards: state.data.cardData
  };

}

// below in connect you can define which slices of the state you want 
export default connect(mapStateToProps,{ fetchMerch })(ShopHome);
