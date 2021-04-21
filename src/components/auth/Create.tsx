import { Component } from "react";
import {
  Form,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import APIURL from "../../helpers/environment";

export interface CreateProps {
  //updateToken here...
}

export interface CreateState {
  email: string;
  password: string;
}

class Create extends Component<CreateProps, CreateState> {
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
                password: this.state.password
            }}),
        headers: new Headers({
          "Content-Type": "application/json",
        })
      }).then(
          (response) => response.json()
          ).then((json:any) => {
              console.log(json)
})
}


  // emailChangeHandler = (event: any) => {
  //   let email = this.state.email;
  //   this.setState({ email: event.target.value });
  // };
  // passChangeHandler = (event: any) => {
  //   let password = this.state.password;
  //   this.setState({ password: event.target.value });
  // };

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
                  value={this.state.email}
                  onChange={(event)=> this.setState({email: event.target.value})}
                  autoComplete='email'
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col xs="6" sm="4">
                <Input
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.setState({password: event.target.value})}
                  autoComplete='password'
                  required
                />
              </Col>
            </Row>

            <Button 
            type="submit"
            onClick={(event) => this.handleClick(event)}>Create Account</Button>
          </Form>
        </Container>
      </main>
    );
  }
}

export default Create;
