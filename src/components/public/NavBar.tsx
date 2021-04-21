import { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../assets/ChickInn2.png";
import ChickDisplay from "./chicks/ChickDisplay";
import Inventory from "../admin/Inventory";
import OrderDisplay from "../customer/OrderDisplay";
import OrderAdmin from "../admin/OrderAdmin";
import Auth from "../auth/Auth";
import Home from "./Home";
import Recipes from "./Recipes";

class NavBar extends Component {
  // constructor (props) {
  //   super(props);
  //     this.state = {
  //       toggleOpen: false,
  //     }
  //   }

  render() {
    return (
      <div>
        <Navbar className="navbar">
          <NavbarBrand href="/">
            <img src={logo} className="headerLogo" alt="ChickInnLogo" />
          </NavbarBrand>
          {/* <NavbarToggler onClick={handleClick} className="me-2" /> */}
          {/* <Collapse isOpen={this.state.toggleOpen} navbar> */}
          <Nav>
            <NavItem>
              <Link to="/meetthechicks">
                <NavLink>Meet the Chicks</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/recipes">
                <NavLink>Egg Recipes</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/account">
                <NavLink>My Account</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/order">
                <NavLink>My Orders</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/orderadmin">
                <NavLink>Order Admin</NavLink>
              </Link>
            </NavItem>
          </Nav>
          {/* </Collapse> */}
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meetthechicks" component={ChickDisplay} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/order" component={OrderDisplay} />
          <Route exact path="/orderadmin" component={OrderAdmin} />
          <Route exact path="/account" component={Auth} />
        </Switch>
      </div>
    );
  }
}
export default NavBar;
