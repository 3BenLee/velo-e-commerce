import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import { addToCart } from '../actions/addToCartAction';
import './ItemDetailView.css';
import ItemAddedModal from './ItemAddedModal';


class ItemDetailView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalOpen: false
    }
  };

  handleOpen = () => {
    this.setState({ 
      modalOpen: true 
    },() => {setTimeout(this.handleClose, 3000)});
  };

  handleClose = () => {
    this.setState({
      modalOpen: false 
    });
  };

  addToCartHandler = () => {
    this.props.addToCart(this.props.card);
    this.handleOpen();
  };

  render() {
    if (!this.props.title) {
      return null;
    }
    
    return (
      <div className="detail-view-wrapper">
        <Card className="text-center detail-view-card">
          <CardImg className="detail-view-img" top width="100%" src={"/" + this.props.img} alt={this.props.title} />
          <CardBody>
            <CardTitle className={"card-title"}>{this.props.title}</CardTitle>
            <CardSubtitle>${this.props.price}</CardSubtitle>
            <CardText>{this.props.description}</CardText>
            <button className= "add-to-cart-button" onClick={() => this.addToCartHandler()}>Add To Cart</button>
          </CardBody>
        </Card>
        <ItemAddedModal open={this.state.modalOpen} toggle={this.toggle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (!state.data.cardData) {
    return {
      title: null,
      img: null,
      description: null,
      price: null
    }
  }
  const card = state.data.cardData[state.card.id]
  return {
    card: card,
    title: card.title,
    id: card.id,
    img: card.img,
    description: card.description,
    price: card.price,
    quantity: 0
  };
}

export default connect(mapStateToProps, { addToCart })(ItemDetailView);
