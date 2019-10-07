import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './ItemCard.css';

class ItemCard extends Component {

  render() {
    return (
      <Card className="text-center item-card" onClick={this.props.clicked} >
        <CardImg className="card-img-top" src={this.props.image} alt="Card image cap" />
        <CardBody className="item-card-body">
        <div  className="item-card-body">
          <CardTitle className="item-card-title">{this.props.title}</CardTitle>
          <CardSubtitle>{`$${this.props.price}`}</CardSubtitle>
          <CardText>{this.props.description}</CardText>
        </div>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(ItemCard);
