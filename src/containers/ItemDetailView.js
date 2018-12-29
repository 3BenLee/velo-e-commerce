import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { addToCart } from '../actions/addToCart';
import './ItemDetailView.css';

class ItemDetailView extends Component {

  addToCartHandler = () => {
    this.props.addToCart(this.props.card);
    console.log('++', this.props.quantity);
  }

  render() {
    // const { classes } = this.props;

    if (!this.props.title) {
      return null;
    }
    
    return (
      // <Card 
      //   className={classes.card}
      //   onClick={this.props.clicked}
      //   >
      //   <CardHeader
      //     action={
      //       <IconButton>
      //         <MoreVertIcon />
      //       </IconButton>
      //     }
      //     title={this.props.title}
      //   />
      //   <CardMedia
      //     className={classes.media}
      //     image={"/" + this.props.img}
      //     title={this.props.title + ' image'}
      //   />
      //   <CardContent>
      //     <Typography component="p">
      //       {this.props.description}
      //     </Typography>
      //     <Typography component="p">
      //       ${this.props.price}
      //     </Typography>
      //     <SvgIcon onClick={() => this.addToCartHandler()} >
      //       <AddShoppingCart />
      //     </SvgIcon>
      //   </CardContent>
      // </Card>
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

// ItemDetailView.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => {
  // console.log("map props to state")
  // console.log(state)
  // console.log("----->",state.data.cardData)
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
