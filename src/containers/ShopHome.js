import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMerch } from '../actions/fetchMerchAction';
import { fetchUniqueMerch } from '../actions/fetchUniqueMerchAction';
import ItemCard from './ItemCard';
//import classes from '*.module.scss';

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  } 
}

class ShopHome extends Component {

  componentDidMount() {
    this.props.onInitMerch();
  }

  ShowItemDetailHandler = (id) => {
    // console.log("*",id);
    this.props.onInitUniqueMerch(id);
    this.props.history.push(`detail/${this.props.id}`)
  }
  
  render() {
    let cards;
    if ( this.props.cards ) {
        cards = Object.values(this.props.cards).map( card => (
          <Link to={'/detail/' + card.id + card.key} key={card.id}>
            <ItemCard 
            key={card.id + new Date().getTime()} 
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
      <div style={styles.wrapper}>
        {cards}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("map props to state")
  // console.log("----->",state.data.cardData)
  return {
    cards: state.data.cardData,
    id: state.data.cardData
  };

}

const mapDispatchToProps = dispatch => {
  return {
    onInitMerch: () => dispatch(fetchMerch()),
    onInitUniqueMerch: (id) => dispatch(fetchUniqueMerch(id))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(ShopHome);
