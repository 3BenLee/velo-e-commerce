import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import {addToCart} from '../actions/addToCart'

const styles = () => ({
  card: {
    // maxWidth: "calc(33% - 40px)",
    marginTop: 120,
    marginLeft: 20,
    marginRight: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  }
});

class ItemDetailView extends Component {

  addToCartHandler = () => {
    this.props.addToCart(this.props.card)
    console.log('++');
  }

  render() {
    const { classes } = this.props;

    if (!this.props.title) {
      return null;
    }
    
    return (
      <Card 
        className={classes.card}
        onClick={this.props.clicked}
        >
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.title}
        />
        <CardMedia
          className={classes.media}
          image={"/" + this.props.img}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {this.props.description}
          </Typography>
          <Typography component="p">
            ${this.props.price}
          </Typography>
          <SvgIcon onClick={() => this.addToCartHandler()} >
            <AddShoppingCart />
          </SvgIcon>
        </CardContent>
      </Card>
    );
  }
}

ItemDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    img: card.img,
    description: card.description,
    price: card.price
  };
}

export default connect(mapStateToProps, { addToCart })(withStyles(styles)(ItemDetailView));
