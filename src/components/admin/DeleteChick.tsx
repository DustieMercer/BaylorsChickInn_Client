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
  id:number;
  chick_name: string;
  toggleDelete: Function;
}

export interface DeleteChickState {
  modal: boolean;
  
}

class DeleteChick extends React.Component<DeleteChickProps, DeleteChickState> {
  constructor(props: DeleteChickProps) {
    super(props);
    this.state = {
      modal: false,
    };
  }



  handleClick = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/${this.props.id}`, {
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
        <Row>
        
        </Row>
        <Modal isOpen={true} >
          <ModalHeader >Are you sure you want to delete <strong>{this.props.chick_name}</strong>?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Yes
            </Button>
            <Button color="secondary" onClick={(event) =>this.props.toggleDelete()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteChick;
