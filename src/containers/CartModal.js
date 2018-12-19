import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { removeFromCart } from '../actions/removeFromCartAction';
import { uniqBy } from 'lodash';
import {REMOVE_FROM_CART} from '../actions/types';
import getTotal from '../helpers/getTotal';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '25%',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  
  // state={
  //   open: true,
  // }

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  getUniqueItems = () => {
    const initailUniqueItemsArray = uniqBy( this.props.cartItems, 'id')
    const uniqueItems = initailUniqueItemsArray.map( ( uniqueItem ) => {
      const quantity = this.props.cartItems.reduce( ( accumulator, cartItem ) => {
        if ( uniqueItem.id === cartItem.id ) {
          accumulator++;
        }
        return accumulator;
      }, 0);
      return {
        id: uniqueItem.id,
        title: uniqueItem.title,
        price: uniqueItem.price,
        quantity
      }
    })
    return uniqueItems
  };

  removeFromCartHandler = (cartItem) => {
    this.props.onRemove(cartItem)
    console.log("RemoveHandler", cartItem)
    //console.log("RemoveHandler",id)
  }

  render() {
    const { classes } = this.props;

    let items;
    if ( this.props.cartItems ) {
      //console.log('compare!',this.getUniqueItems(), this.props.cartItems)
      const finalUniqueItems = this.getUniqueItems();
      items = finalUniqueItems.map( merch => (
        <TableRow key={merch.id} >
          <TableCell>{merch.title}</TableCell>
          <TableCell>{merch.price}</TableCell>
          <TableCell>{merch.quantity}</TableCell>
          <TableCell>
          <Button 
            variant="outlined" 
            className={classes.button} 
            onClick={() => this.removeFromCartHandler(merch)} >
            Remove
          </Button>
          </TableCell>
        </TableRow>
      ))}

    let total;
    if ( this.props.cartItems ) {
      total = getTotal(this.props.cartItems)
    }

    return (
 
      <div>
        {/* <Button onClick={this.handleOpen}>
          <SvgIcon>
            <ShoppingCart />
          </SvgIcon>
        </Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              My Cart
            </Typography>
            <Table>
              <TableBody>
                {items}
                <TableRow >
                  <TableCell>Total</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            <Link to='/checkout'>
              <Button>
                Checkout
              </Button>
            </Link>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("$&",state.card.id)
  // console.log("----->",state.data.cardData)
  if (!state.data.cardData) {
    return {
      title: null,
      id: null,
      img: null,
      description: null,
      price: null
    }
  }

  const card = state.data.cardData[state.card.id]
  return {
    card: card,
    cartItems: state.shoppingCart.cartItems,
    id: state.card.id,

  };
}
const mapDispatchToProps = (dispatch) => {
  return{
    onRemove: (merch) => dispatch(removeFromCart(merch)) 
  }
}


const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleModalWrapped));

