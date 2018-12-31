import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { addToCart } from '../actions/addToCartAction';
import './ItemDetailView.css';

class ItemDetailView extends Component {

  addToCartHandler = () => {
    this.props.addToCart(this.props.card);
    console.log('++', this.props.quantity);
  }

  render() {
    if (!this.props.title) {
      return null;
    }
    
    return (
      <div className="detail-view-wrapper">
        <Card className="detail-view-card" onClick={this.props.clicked}>
          <CardImg top width="100%" src={"/" + this.props.img} alt={this.props.title} />
          <CardBody>
            <CardTitle >{this.props.title}</CardTitle>
            <CardSubtitle>${this.props.price}</CardSubtitle>
            <CardText>{this.props.description}</CardText>
            <SvgIcon onClick={() => this.addToCartHandler()} >
              <AddShoppingCart />
            </SvgIcon>
          </CardBody>
        </Card>
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
