import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Input,
} from "reactstrap";

export interface DeleteProfileProps {
  sessionToken: string;
  id: number;
  first_name: string;
}

export interface DeleteProfileState {
  modal: boolean;
}

class DeleteProfile extends React.Component<DeleteProfileProps, DeleteProfileState> {
  constructor(props: DeleteProfileProps) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  handleClick = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/profile/${this.props.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((res) => console.log(res))
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Delete
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Are you sure you want to delete <strong>{this.props.first_name}</strong>?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteProfile;
