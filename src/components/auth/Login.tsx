import { Component } from "react";
import React from "react";
import { Form, Input, Button, Container, Row, Col } from "reactstrap";
import APIURL from "../../helpers/environment";

export interface LoginProps {
  //updateToken here...
}

export interface LoginState {
  email: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
  };


    fetch(`${APIURL}/user/login`, requestOptions)
      .then((response) => response.json())
      .then((json: any) => {
        console.log(json);
      });
  };

  render() {
    return (
      <main>
        <Container>
          <Form>
            <Row>
              <Col xs="6" sm="4">
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
              <Col xs="6" sm="4">
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
        </Container>
      </main>
    );
  }
}

export default Login;
