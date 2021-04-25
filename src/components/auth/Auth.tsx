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
}

export interface AuthState {
  modal: boolean;
  login: boolean;
  headerText:string;
  buttonText: string;
  buttonLabel: string;
  className: string;
}

class Auth extends Component<AuthProps, AuthState> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: true,
      login: true,
      headerText: 'Checking In?',
      buttonText: "Need to Register?",
      buttonLabel: "",
      className: "",
    };
  }

  toggle = () => 
  this.setState({modal: !this.state.modal});

  registerToggle = () =>
  (this.state.login === true) ?
    this.setState({login: !this.state.login, headerText: 'Welcome To the Chick Inn', buttonText: 'Already a User?'}) :
    this.setState({login: !this.state.login, headerText: 'Welcome Back', buttonText: 'Need to Register?'}) 
  
  closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
  
  render() {
    return (
      <div>
      <Button color="Primary" onClick={this.toggle}>{this.state.buttonLabel}</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.className}>
        <ModalHeader toggle={this.toggle} close={this.closeBtn}>{this.state.headerText}</ModalHeader>
        <ModalBody>

        {this.state.login === true ? (
              <Login updateToken={this.props.updateToken} />
            ) : (
              <Create updateToken={this.props.updateToken} />
            )}    
        
        
        </ModalBody>
        <ModalFooter>

          <Button color="primary" onClick={this.registerToggle}>{this.state.buttonText}</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
          
          
    );
  }
}
export default Auth;
