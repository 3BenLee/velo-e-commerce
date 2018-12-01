import React, { Component } from 'react';
import { connect } from 'react-redux';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { totalMerch } from '../actions/totalMerchAction';

class AddCartIcon extends Component {

  addToTotalHandler = (price) => {
    this.props.totalMerch(price);
    console.log('++');
  }

  render () {
    return (
      
        <AddShoppingCart onClick={(price) => this.addToTotalHandler(price)}/>
      
    )
  }
}

const mapStateToProps = state => (
  {
    totalPrice: state.total.totalPrice
  }
)

// const mapDispatchToProps = dispatch => {
//   return { 
//     onTotalMerch: (val) => dispatch({type: totalMerch(val)})
//   }
// }

export default connect(mapStateToProps, { totalMerch })(AddCartIcon);