import { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavLink, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <Navbar color="primary" dark>
            <NavbarBrand href="/" className="me-auto">
              Routes Practice
            </NavbarBrand>
            <NavbarToggler className="me-2" />
            <Collapse >
              <Nav navbar>
                <NavItem>
                  <Link to="/" >
                    <NavLink>Home</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/meetthechicks" >
                    <NavLink>Meet the Chicks</NavLink>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        )
    }
}
export default NavBar;