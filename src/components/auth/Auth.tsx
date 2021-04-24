import { Component } from "react";
import {Row} from 'reactstrap';
import Create from "./Create";
import Login from "./Login";

export interface AuthProps {
  updateToken: Function;
}

class Auth extends Component<AuthProps,any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <Row>
       <Login updateToken={this.props.updateToken}/>
       <Create updateToken={this.props.updateToken}/>
       </Row>
      </main>
    );
  }
}
export default Auth;
