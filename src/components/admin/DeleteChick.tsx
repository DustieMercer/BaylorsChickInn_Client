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

export interface DeleteChickProps {
  sessionToken: string;
  fetchChicks:Function;
}

export interface DeleteChickState {
  modal: boolean;
  id:number;
}

class DeleteChick extends React.Component<DeleteChickProps, DeleteChickState> {
  constructor(props: DeleteChickProps) {
    super(props);
    this.state = {
      modal: false,
      id: 1,
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  handleClick = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/${this.state.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then(() => this.props.fetchChicks())
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Delete Chick Confirmation
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Chick</ModalHeader>
          <ModalBody>You Sure?</ModalBody>
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

export default DeleteChick;
