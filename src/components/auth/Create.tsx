import { Component } from "react";
import APIURL from "../../helpers/environment";
import { Card, Form, Input, Button, Row, Col, CardImg } from "reactstrap";
import chick from "../assets/chickenCardImg.jpg";
import IUser from "../interfaces/IUser";
import IAuth from "../interfaces/IAuth";


export interface CreateProps {
  updateToken: Function;
  updateRole:Function;
  toggle:Function;
  checkUserPriviledge: Function;
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
        this.props.toggle();
        this.props.checkUserPriviledge();
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
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  autoComplete="email"
                  required
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Input
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  autoComplete="password"
                  required
                />
              </Col>
            </Row>
            <br />
            <Button type="submit" onClick={(event) => this.handleClick(event)}>
              Create Account
            </Button>
          </Form>
        </Card>
      </main>
    );
  }
}

export default Create;
