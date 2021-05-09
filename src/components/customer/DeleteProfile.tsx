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
  toggleDelete: Function;
}

export interface DeleteProfileState {

}

class DeleteProfile extends React.Component<DeleteProfileProps, DeleteProfileState> {
  constructor(props: DeleteProfileProps) {
    super(props);
    this.state = {

    };
  }



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
        
        <Modal isOpen={true} toggle={this.props.toggleDelete()}>
          <ModalHeader toggle={this.props.toggleDelete()}>Are you sure you want to delete <strong>{this.props.first_name}</strong>?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Yes
            </Button>{" "}
            <Button color="danger" onClick={(event) => this.props.toggleDelete()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteProfile;
