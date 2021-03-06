import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CardDeck } from "reactstrap";
import { fetchMerch } from "../actions/fetchMerchAction";
import { fetchUniqueMerch } from "../actions/fetchUniqueMerchAction";
import ItemCard from "./ItemCard";
import shortid from "shortid";
import "./ShopHome.css";

class ShopHome extends Component {
  componentDidMount() {
    this.props.onInitMerch();
  }

  showItemDetailHandler = id => {
    this.props.onInitUniqueMerch(id);
    this.props.history.push(`detail/${this.props.id}`);
  };

  render() {
    const cards = this.props.cards && Object.values(this.props.cards).map(card => (
      <Link
        className="mt-5"
        style={{ textDecoration: "none" }}
        to={"/detail/" + card.id}
        key={`div-${shortid.generate()}`}
      >
        <ItemCard
          key={card.id}
          id={card.id}
          title={card.title}
          price={card.price}
          image={card.img}
          description={card.description}
          clicked={() => this.showItemDetailHandler(card.id)}
        />
      </Link>
    ));

    return (
      <CardDeck className="card-deck justify-content-center">
        {cards}
      </CardDeck>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.data.cardData,
    id: state.data.cardData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitMerch: () => dispatch(fetchMerch()),
    onInitUniqueMerch: id => dispatch(fetchUniqueMerch(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopHome);
