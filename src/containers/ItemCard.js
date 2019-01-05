import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './ItemCard.css';
// import { Link } from 'react-router-dom';

class ItemCard extends Component {

  render() {
    
    return (
      
      // <Link to={this.props.url}>
        <Card className="text-center item-card" onClick={this.props.clicked} > 
          <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
          <CardBody className="item-card-body">
          <div  className="item-card-body">
           <CardTitle className="item-card-title">{this.props.title}</CardTitle>
            <CardSubtitle>${this.props.price}</CardSubtitle>
            <CardText>{this.props.description}</CardText>
          </div>

          </CardBody>
        </Card>
      // </Link>
    
    );
  }
}

export default withRouter(ItemCard);

