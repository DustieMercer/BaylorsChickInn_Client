import { Component } from "react";
import React from "react";
import APIURL from "../../helpers/environment";

import { Card, CardImg, Form, Input, Button, Row, Col } from "reactstrap";
import chick from "../assets/chickenCardImg.jpg";

import IUser from '../interfaces/IUser';
import IAuth from '../interfaces/IAuth';


export interface LoginProps {
  updateToken: Function;
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
              password: this.state.password
          }}),
      headers: new Headers({
        "Content-Type": "application/json",
      })
    })
      .then((response) => response.json())
      .then((json:IAuth ) => {
        let token = json.sessionToken
        let role = json.user.role
        let user = json.user.id
        this.props.updateToken(token)
      });
  };

  render() {
    return (
      <main>
        <Card>
          <CardImg src={chick}></CardImg>
          <Form>
            <Row>
              <Col>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(event) => this.setState({ email: event.target.value })}
                  value={this.state.email}
                  autoComplete="email"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  onChange={(event) => this.setState({ password: event.target.value })}
                  value={this.state.password}
                />
              </Col>
            </Row>

            <Button type="submit" onClick={(e)=>this.handleSubmit(e)}>
              Login
            </Button>
            </Form>
        </Card>
      </main>
    );
  }
}

export default Login;
