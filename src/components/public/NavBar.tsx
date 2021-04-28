import { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import logo from "../assets/ChickInn2.png";
import ChickDisplay from "./chicks/ChickDisplay";
import Inventory from "../admin/Inventory";
import ChickAdmin from "../admin/ChickAdmin";
import OrderDisplay from "../customer/OrderDisplay";
import OrderAdmin from "../admin/OrderAdmin";
import Auth from "../auth/Auth";
import Home from "./Home";
import Recipes from "./Recipes";
import Profile from "../customer/Profile";

export interface NavBarProps {
  updateToken: Function;
  updateRole: Function;
  role: string;
  sessionToken: string;
}

export interface NavBarState {
  sessionToken: string;
  role: string;
  showLogin: boolean;
  adminRoutes: boolean;
  defaultRoutes: boolean;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "",
      role: "",
      showLogin: true,
      adminRoutes:false,
      defaultRoutes: false,
    };
  }
  
  checkUserPrivilege = () => {
    this.loginToggle();
    this.protectedAdminRoutes();
    this.protectedCustomerRoutes();
  }

  loginToggle = () => {
    this.state.adminRoutes || this.state.defaultRoutes === true ? 
      this.setState({ showLogin:true}) :
    this.setState ({showLogin:false})
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
    this.setState({ role: "" });
    this.checkUserPrivilege();
  };

  protectedAdminRoutes = () => {
    this.state.role === 'admin' ? this.setState({adminRoutes: true}): this.setState({adminRoutes: false})
  }

  protectedCustomerRoutes = () => {
    this.state.role === 'default' ? this.setState({defaultRoutes: true}) :this.setState({defaultRoutes: false})
  }



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
              <Link to="/meetthechicks">
                <NavLink>Meet the Chicks</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/recipes">
                <NavLink>Egg Recipes</NavLink>
              </Link>
            </NavItem>

            {this.state.showLogin === true ? (
              <Link to="/account">
                <Button>Login</Button>
              </Link>
            ) : (
              <Button onClick={this.clearToken}>Logout</Button>
            )}

            {/******** CUSTOMER ROUTES ***********/}
            {this.props.role === "default" ? (
              <NavItem>
                <Link to="/order">
                  <NavLink>My Orders</NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}

            {/******** ADMIN ROUTES ***********/}
            {this.state.adminRoutes == true ? (
              <NavItem>
                <Link to="/orderadmin">
                  <NavLink>Order Admin</NavLink>
                </Link>
              </NavItem>
              ) : (
              ""
            )}
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/" ><Home /></Route>
          <Route exact path="/meetthechicks" component={ChickDisplay} />
          <Route exact path="/recipes" component={Recipes} />

          <Route exact path="/account">
            {" "}
            {this.state.sessionToken ? (
              <Profile
                sessionToken={this.props.sessionToken}
                role={this.state.role}
              />
            ) : (
              <Auth
                updateToken={this.props.updateToken}
                updateRole={this.props.updateRole}
                checkUserPriviledge={this.checkUserPrivilege}
              />
            )}
            <Route exact path="/order" component={OrderDisplay} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/chickadmin" component={ChickAdmin} />
            <Route exact path="/orderadmin" component={OrderAdmin} />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default NavBar;
