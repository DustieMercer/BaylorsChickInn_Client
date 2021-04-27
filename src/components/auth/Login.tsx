import { Component } from "react";
import React from "react";
import APIURL from "../../helpers/environment";
//STYLING
import { Card, CardImg, Form, Input, Button, Row, Col } from "reactstrap";
import chick from "../assets/chickenCardImg.jpg";
//INTERFACES
import IUser from "../interfaces/IUser";
import IAuth from "../interfaces/IAuth";

export interface LoginProps {
  updateToken: Function;
  updateRole:Function;
}

class Login extends React.Component<LoginProps, IUser> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json: IAuth) => {
        let role = json.user.role;
        let token = json.sessionToken;
        if (role === 'admin')
        this.props.updateToken(token);
        this.props.updateRole(role);
      });
  };

  render() {
    return (
      <main>
        <Card>
          <CardImg src={chick}></CardImg>
          <br />
          <Form>
            <Row>
              <Col>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  value={this.state.email}
                  autoComplete="email"
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                />
              </Col>
            </Row>
            <br />

            <Button type="submit" onClick={(e) => this.handleSubmit(e)}>
              Login
            </Button>
          </Form>
        </Card>
      </main>
    );
  }
}

export default Login;
