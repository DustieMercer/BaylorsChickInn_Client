import { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import logo from "../assets/ChickInn2.png";
import ChickDisplay from "./chicks/ChickDisplay";
import Inventory from "../admin/Inventory";
import OrderDisplay from "../customer/OrderDisplay";
import OrderAdmin from "../admin/OrderAdmin";
import Auth from "../auth/Auth";
import Home from "./Home";
import Recipes from "./Recipes";

export interface NavBarProps {
  updateToken: Function;
}

export interface NavBarState {
  
}

class NavBar extends Component<NavBarProps, any> {
  constructor(props:any) {
    super(props); 
    this.state = {
      };
    }


  render() {
    return (
      <div>
        <Navbar className="navbar">
          <NavbarBrand href="/">
            <img src={logo} className="headerLogo" alt="ChickInnLogo" />
          </NavbarBrand>
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
          <Button>Logout</Button>

        </Navbar>

        <Switch>
          <Route exact path="/">{Home}</Route>
          <Route exact path="/meetthechicks">{ChickDisplay}</Route>
          <Route exact path="/recipes" >{Recipes}</Route>
          <Route exact path="/inventory">{Inventory}</Route>
          <Route exact path="/order">{OrderDisplay}</Route>
          <Route exact path="/orderadmin" >{OrderAdmin}</Route>
          <Route exact path="/account"><Auth updateToken={this.props.updateToken} /></Route>
        </Switch>
      </div>
    );
  }
}
export default NavBar;
