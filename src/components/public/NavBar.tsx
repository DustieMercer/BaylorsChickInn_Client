import { Component } from "react";
import { Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import logo from "../assets/ChickInn2.png";
import ChickDisplay from "./chicks/ChickDisplay";
import ChickAdmin from "../admin/ChickAdmin";
import Auth from "../auth/Auth";
import Home from "./Home";
import Recipes from "./Recipes";
import ProfileDisplay from "../customer/ProfileDisplay";
import OrderDisplay from '../customer/OrderDisplay';


export interface NavBarProps {
  updateToken: Function;
  updateRole: Function; 
  role: string;
  sessionToken: string;
}

export interface NavBarState {
  showLogin: boolean;
  adminRoutes: boolean;
  defaultRoutes: boolean;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      showLogin: true,
      adminRoutes: false,
      defaultRoutes: false,
    };
  }

   clearToken = () => {
    localStorage.clear();
    this.setState({ adminRoutes: !this.state.adminRoutes });
    this.setState({ defaultRoutes: !this.state.defaultRoutes });
  };

  render() {
    return (
      <div>
        <Navbar className="navbar">
          <NavbarBrand href="/">
            <img src={logo} className="headerLogo" alt="ChickInnLogo" />
          </NavbarBrand>
          <Nav>
            {/******** PUBLIC ROUTES ***********/}
            <NavItem>
              <Link to="/meetthechicks" style={{ textDecoration: 'none' }}>
                <NavLink>Meet the Chicks</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/recipes" style={{ textDecoration: 'none' }}>
                <NavLink>Egg Recipes</NavLink>
              </Link>
            </NavItem>

            {/******** PROTECTED ROUTES ***********/}

            {localStorage.getItem("sessionToken") ? (
              <NavItem>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                  <NavLink>My Profile</NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}
            {localStorage.getItem("sessionToken") ? (
              <NavItem>
                <Link to="/order" style={{ textDecoration: 'none' }}>
                  <NavLink>Orders</NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}

            {localStorage.getItem("role") === "admin" ? (
              <NavItem>
                <Link to="/chickadmin" style={{ textDecoration: 'none' }}>
                  <NavLink>Chick Admin</NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}
          </Nav>
          {localStorage.getItem("sessionToken") ? (
            <Button onClick={this.clearToken}>Logout</Button>  
          ) : (
            <Link to="/account">
              <Button><Auth
              updateToken={this.props.updateToken}
              updateRole={this.props.updateRole}
            />Login</Button>
            </Link>
          )}
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/meetthechicks" component={ChickDisplay} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/profile"> 
          <ProfileDisplay sessionToken={this.props.sessionToken} />
            </Route> 
            <Route exact path="/order"> 
          <OrderDisplay sessionToken={this.props.sessionToken} />
            </Route> 
          <Route exact path="/chickadmin"> 
          <ChickAdmin sessionToken={this.props.sessionToken} />
            </Route> 
        </Switch>
      </div>
    );
  }
}
export default NavBar;
