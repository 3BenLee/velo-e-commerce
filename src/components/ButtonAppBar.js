import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import SvgIcon from '@material-ui/core/SvgIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CartModal from '../containers/CartModal';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    marginBottom: 50,
  }
}; 

class ButtonAppBar extends Component {

  constructor (props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  state = {
    open: false,
  }

  toggle = () => {
    this.setState({
      open:!this.state.open 
    });
  };
  
  handleOpen = () => {
    console.log("Cart Open", this.state.open);
    this.setState({ 
      open: true 
    });
  };

  handleClose = () => {
    this.setState({
      open: false 
    });
  };

  render () {
    // const cartModalIsOpen;
    //   cartModalIsOpen = this.state.open 
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Typography 
                variant="h6" 
                color="inherit" 
                className={classes.grow}>
                Velo-Velo
              </Typography>
            </Link>
            <SvgIcon onClick={this.handleOpen}>
              <ShoppingCart />
            </SvgIcon>
            <CartModal open={this.state.open} toggle={this.toggle} handleClose={this.handleClose}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  } 
}

export default withStyles(styles)(ButtonAppBar);
