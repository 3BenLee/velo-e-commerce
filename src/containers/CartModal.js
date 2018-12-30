import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
// // import SvgIcon from '@material-ui/core/SvgIcon';
// import ShoppingCart from '@material-ui/icons/ShoppingCart';
// import PropTypes from 'prop-types';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableRow from '@material-ui/core/TableRow';
import { removeFromCart } from '../actions/removeFromCartAction';
import { uniqBy } from 'lodash';
// import {REMOVE_FROM_CART} from '../actions/types';
import getTotalHelper from '../helpers/getTotalHelper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {compose} from 'redux'
import Radium from 'radium'


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

// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     top: '50%',
//     left: '25%',
//     // width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//   },
// });

class CartModal extends React.Component {
  
  // constructor (props){
  //   super(props)
  //   this.state={
  //     open: this.props.open,
  //   }
  //   this.toggle = this.toggle.bind(this)
  //   this.showModal = this.showModal.bind(this)
  // }


  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  getUniqueItemsHandler = () => {
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

  // toggle = () => {
  //   this.setState({
  //     open:!this.state.open 
  //   });
  // };

  removeFromCartHandler = (cartItem) => {
    this.props.onRemove(cartItem)
    console.log("RemoveHandler", cartItem)
    //console.log("RemoveHandler",id)
  }

  // showModal = () => {
  //   console.log("Cart Open", this.state.open);
  //   this.setState({ 
  //     open: true 
  //   });
  // }

  render() {
    // const { classes } = this.props;

    let items;
    if ( this.props.cartItems ) {
      //console.log('compare!',this.getUniqueItems(), this.props.cartItems)
      const finalUniqueItems = this.getUniqueItemsHandler();
      items = finalUniqueItems.map( merch => (
        <tr key={merch.id} >
          <td>{merch.title}</td>
          <td>{merch.quantity}</td>
          <td>{merch.price}</td>
          <td>
          <Button 
            className="remove-button "
            onClick={() => this.removeFromCartHandler(merch)} >
            Remove
          </Button>
          </td>
        </tr>
      ))}

    let total;
    if ( this.props.cartItems ) {
      total = getTotalHelper(this.props.cartItems)
    }

    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}
          onClose={this.props.handleClose}  className={this.props.className}>
          <ModalHeader>Cart</ModalHeader>
          <ModalBody>
          <Table striped>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
              <tbody>
                {items}
                <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
          <Link to='/checkout'>
            <Button>
              Checkout
            </Button>
          </Link>
          </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);