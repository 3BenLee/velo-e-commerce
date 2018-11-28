import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import CartIcon from './ShoppingCartIcon';
import SvgIcon from '@material-ui/core/SvgIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar style={styles.appBar} position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Velo-Velo
          </Typography>
          <Button color="inherit">Login</Button>
          <SvgIcon>
            <ShoppingCart onClick={props.click} />
          </SvgIcon>
          {/* <CartIcon />  */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

//ButtonAppBar.propTypes = {
  //classes: PropTypes.object.isRequired,
//};

export default withStyles(styles)(ButtonAppBar);
