import { Component } from "react";
import APIURL from "../../helpers/environment";
import {
  Card,
  FormGroup,
  Form,
  Button,
  Row,
  Col,
  CardImg,
  FormText
} from "react-bootstrap";
import chick from "../assets/chickenCardImg.jpg";
import IUser from "../interfaces/IUser";
import IAuth from "../interfaces/IAuth";

export interface CreateProps {
  updateToken: Function;
  updateRole: Function;
  toggleAuth: Function;
}

class Create extends Component<CreateProps, IUser> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleClick = (event: any) => {
    event.preventDefault();
    fetch(`${APIURL}/user/create`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          role: "default",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json: IAuth) => {
        let sessionToken = json.sessionToken;
        let role = json.user.role;
        console.log(sessionToken, role);
        this.props.updateToken(sessionToken);
        this.props.updateRole(role);
        this.props.toggleAuth();
      });
  };

  render() {
    return (
      <main>
               
          <Form onSubmit={this.handleClick}>
        <FormGroup>
          <Form.Label htmlFor="email">Email</Form.Label>



          <Form.Control 
            onChange={(event) =>
              this.setState({ email: event.target.value })
            }
            type="email"
            name="email"
            value={this.state.email}
            autoComplete="email"
            required
          />
           
        </FormGroup>
            <br />
            <FormGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control 
             onChange={(event) =>
              this.setState({ password: event.target.value })
            }
            minLength={5}
            name="password"
            value={this.state.password}
            type="password"
            autoComplete="password"
            required
          />
           
        </FormGroup>
            <br />
            <Button type="submit" onClick={(event) => this.handleClick(event)}>
              Create Account
            </Button>
          </Form>
      </main>
    );
  }
}

export default Create;
