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

  ShowItemDetailHandler = (id) => {
    this.props.history.push(`detail/${this.props.id}`)
  }
  
  render() {
    let cards;
    if ( this.props.cards ) {
        cards = Object.values(this.props.cards).map( card => (
          <Link to={'/detail/' + card.id} key={card.id}>
            <ItemCard 
            key={card.id}
            id={card.id} 
            title={card.title}
            price={card.price}
            image={card.img} 
            description={card.description}
            clicked={() => this.ShowItemDetailHandler(card.id)}
            />
          </Link>
        ) )
    }
    return (
        <div>
            {cards}
        </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("map props to state")
  console.log("----->",state.data.cardData)
  return {
    cards: state.data.cardData
  };

}

// below in connect you can define which slices of the state you want 
export default connect(mapStateToProps,{ fetchMerch })(ShopHome);
