import React from 'react';
import { connect } from 'react-redux';
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



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  
  state={
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeFromCartHandler = () => {
    this.props.removeFromCart(this.props.card)
  }

  render() {
    const { classes } = this.props;

    let items;
    if ( this.props.cartItems ) {
      items = this.props.cartItems.map( merch => (
        <TableRow key={merch.id} >
          <TableCell>{merch.title}</TableCell>
          <TableCell>{merch.price}</TableCell>
          <TableCell>
          <Button 
            variant="outlined" 
            className={classes.button} 
            onClick={() => this.removeFromCartHandler(this.props.card)} >
            Remove
          </Button>
          </TableCell>
        </TableRow>
      ))}

    let total;
    if ( this.props.cartItems ) {
      total = (this.props.cartItems).reduce(function (accumulator, item) {
        return accumulator + item.price;
      }, 0);}

    return (
 
      <div>
        <Button onClick={this.handleOpen}>
          <SvgIcon>
            <ShoppingCart />
          </SvgIcon>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
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
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

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
    cartItems: state.shoppingCart.cartItems
    // title: card.title,
    // img: card.img,
    // description: card.description,
    // price: card.price
  };
}

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, { removeFromCart })(withStyles(styles)(SimpleModalWrapped));

