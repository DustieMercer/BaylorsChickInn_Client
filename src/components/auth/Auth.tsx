import { Component } from "react";
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Create from "./Create";
import Login from "./Login";

export interface AuthProps {
  updateToken: Function;
  updateRole: Function;
  showAuth: boolean;
  toggleAuth:Function;
}

export interface AuthState {
  login: boolean;
  headerText: string;
  buttonText: string;
  buttonLabel: string;
  className: string;
}

class Auth extends Component<AuthProps, AuthState> {
  constructor(props: any) {
    super(props);
    this.state = {
      login: true,
      headerText: "Checking In?",
      buttonText: "Need to Register?",
      buttonLabel: "",
      className: "",
    };
  }

  registerToggle = () =>
    this.state.login === true
      ? this.setState({
          login: !this.state.login,
          headerText: "Welcome To the Chick Inn",
          buttonText: "Already a User?",
        })
      : this.setState({
          login: !this.state.login,
          headerText: "Welcome Back",
          buttonText: "Need to Register?",
        });

  closeBtn = (
    <button className="close" onClick={(event) => this.props.toggleAuth()}>
      &times;
    </button>
  );

  render() {
    return (
      <div>

        <Modal
          isOpen={this.props.showAuth}
        
        >
          <ModalHeader  close={this.closeBtn}>
            {this.state.headerText}
          </ModalHeader>
          <ModalBody>
            {this.state.login === true ? (
              <Login
                updateToken={this.props.updateToken}
                updateRole={this.props.updateRole}
                toggleAuth={this.props.toggleAuth}
              />
            ) : (
              <Create
                updateToken={this.props.updateToken}
                updateRole={this.props.updateRole}
                toggleAuth={this.props.toggleAuth}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.registerToggle}>
              {this.state.buttonText}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Auth;
