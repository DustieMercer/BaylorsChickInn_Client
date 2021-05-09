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

export interface DeleteOrderProps {
  sessionToken: string;
  id: number;
  fetchOrders: Function;
  toggleDelete: Function;
}

export interface DeleteOrderState {
 
}

class DeleteOrder extends React.Component<DeleteOrderProps, DeleteOrderState> {
  constructor(props: DeleteOrderProps) {
    super(props);
    this.state = {
    
    };
  }


  handleClick = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/order/${this.props.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
    .then(() => this.props.fetchOrders())
  };

  render() {
    return (
      <div>
        
        <Modal isOpen={true} >
          <ModalHeader>Are you sure you want to cancel your order?</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={(event) =>this.props.toggleDelete()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteOrder;
