import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { removeFromCart } from '../actions/removeFromCartAction';
import { uniqBy } from 'lodash';
import getTotalHelper from '../helpers/getTotalHelper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CartModal.css';

class CartModal extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // items: []
  //   }
  // }

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

  removeFromCartHandler = (cartItem) => {
    this.props.onRemove(cartItem)
    console.log("RemoveHandler", cartItem)
    //console.log("RemoveHandler",id)
  }

  render() {
    let items;
    if ( this.props.cartItems ) {
      const finalUniqueItems = this.getUniqueItemsHandler();
      items = finalUniqueItems.map( merch => (
        <tr key={merch.id} >
          <td>{merch.title}</td>
          <td>{merch.quantity}</td>
          <td>${merch.price}</td>
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
    console.log("ITEMS,",items);
    console.log("total",total)
    return (
      <div>
        <Modal isOpen={this.props.open} toggle={this.props.toggle}
          onClose={this.props.handleClose}  className={this.props.className}>
          
          { total ?  

          (<React.Fragment>
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
                  <td></td>
                  <td>Total</td>
                  <td>${total}</td>
              </tr>
              </tbody> 
            </Table>
          </ModalBody>
          <ModalFooter>
          <Link to='/checkout'>
            <Button onClick = {this.props.toggle} >
              Checkout
            </Button>
          </Link>
          </ModalFooter>
          </React.Fragment> )  : 
                
          ( <React.Fragment>
              <ModalHeader>Cart</ModalHeader>
                <ModalBody>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                      <tr>
                        <th className="cart-empty-alert">*Please Add Items*</th>
                      </tr>
                    </thead>
                  </Table>
                </ModalBody>
            </React.Fragment>
            
          )}

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