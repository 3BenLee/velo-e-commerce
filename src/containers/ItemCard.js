import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './ItemCard.css';

class ItemCard extends Component {

  render() {
    
    return (
    <div>
      <Card className="card-style" onClick={this.props.clicked}>
        <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
        <CardBody>
          <CardTitle >{this.props.title}</CardTitle>
          <CardSubtitle>${this.props.price}</CardSubtitle>
          <CardText>{this.props.description}</CardText>
        </CardBody>
      </Card>
    </div>
    );
  }
}

// style={{width: 20 + 'rem' }}

export default withRouter(ItemCard);

