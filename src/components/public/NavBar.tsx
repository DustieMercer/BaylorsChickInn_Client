import { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import logo from "../assets/ChickInn2.png";
import ChickDisplay from "./chicks/ChickDisplay";
import Inventory from "../admin/Inventory";
import OrderDisplay from "../customer/OrderDisplay";
import OrderAdmin from "../admin/OrderAdmin";
import Auth from "../auth/Auth";
import Home from './Home';
import Recipes from "./Recipes";


export interface NavBarProps {
  updateToken: Function;
  updateRole:Function;

}

export interface NavBarState {
  loginToggle: boolean,
}

class NavBar extends Component<NavBarProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  } 

  clearToken = () => {
    localStorage.clear(); 
    this.setState({sessionToken: ""});
    this.setState({role:''});
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
              <Link to="/order">
                <NavLink>My Orders</NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/orderadmin">
                <NavLink>Order Admin</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/account">
                <NavLink>Login</NavLink>
              </Link>
            </NavItem>
          </Nav>

          <Button onClick=
          {this.clearToken}>Logout</Button>          
        
        </Navbar>

        

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meetthechicks" component={ChickDisplay} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/order" component={OrderDisplay} />
          <Route exact path="/orderadmin" component={OrderAdmin} />
          <Route exact path="/account">
            <Auth updateToken={this.props.updateToken} updateRole={this.props.updateRole}/>
          </Route>
        </Switch>
      </div>
    );
  }
}
export default NavBar;
