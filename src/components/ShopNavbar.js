import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SvgIcon from '@material-ui/core/SvgIcon';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CartModal from '../containers/CartModal';
import './ShopNavbar.css';

class ShopNavbar extends React.Component {
  constructor (props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  state = {
    modalOpen: false,
  }

  toggle = () => {
    this.setState({
      modalOpen:!this.state.modalOpen 
    });
  };
  
  handleOpen = () => {
    this.setState({ 
      modalOpen: true 
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false 
    });
  };

  render () {
    return (
      <div>
      <Navbar className="navbar" light expand="md">
          <NavbarBrand href="/">Velo-Velo</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <SvgIcon className="shopping-cart" onClick={this.handleOpen}>
              <ShoppingCart />
            </SvgIcon>
            <CartModal open={this.state.modalOpen} toggle={this.toggle} handleClose={this.handleClose}/> 
            </NavItem>
            <NavItem>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/">
                  <DropdownItem>
                    Home
                  </DropdownItem>
                </Link>
                <DropdownItem>
                  Sign In
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  } 
}

export default ShopNavbar;
