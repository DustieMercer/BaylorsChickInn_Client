import { Component } from "react";
import APIURL from "../../helpers/environment";
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
import IOrder from "../interfaces/IOrder";

export interface OrderUpdateProps {
  sessionToken: string;
  item_description: string,
  unit_type: string,
  quantity_ordered: number,
  unit_cost: number,
  order_total: number,
  status: string,
  id: number,
  toggleUpdate: Function;
  fetchOrders: Function;
}

export interface OrderUpdateState {
  item_description: string;
  unit_type: string;
  quantity_ordered: number;
  unit_cost: number;
  order_total: number;
  status: string;
}

class OrderUpdate extends Component<OrderUpdateProps, OrderUpdateState> {
  constructor(props: OrderUpdateProps) {
    super(props);
    this.state = {
      item_description: this.props.item_description,
      unit_type: "",
      quantity_ordered: NaN,
      unit_cost: NaN,
      order_total: NaN,
      status: "",
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/order/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        item_description: this.state.item_description,
        unit_type: this.state.unit_type,
        quantity_ordered: this.state.quantity_ordered,
        unit_cost: this.state.unit_cost,
        order_total: this.state.order_total,
        status: this.state.status,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IOrder) => {
        console.log(json);
        this.props.toggleUpdate();
      });
  };

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Update Order</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <Input
                    placeholder="Item Description"
                    type="select"
                    name="select"
                    
                  ><option>Item Select</option>
                    <option>Jumbo Eggs</option>
                    <option>Large Eggs</option>
                    <option>Medium Eggs</option>
                    value={this.state.item_description}
                    onChange=
                    {(event: any) =>
                      this.setState({ item_description: event.target.value })
                    }
                  </Input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input type="select" name="select">
                  <option>Unit Type</option>
                    <option>Dozen</option>
                    <option>1/2 Dozen</option>
                    value={this.state.unit_type}
                    onChange=
                    {(event: any) =>
                      this.setState({ unit_type: event.target.value })
                    }
                  </Input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Qty"
                    type="select"
                    name="select"
                    >
                      <option>Quantity</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    value={this.state.quantity_ordered}
                    onChange=
                    {(event: any) =>
                      this.setState({ quantity_ordered: event.target.value })
                    }
                  </Input>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Price EA"
                    type="text"
                    value={this.state.unit_cost}
                    onChange={(event: any) =>
                      this.setState({ unit_cost: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Total"
                    type="text"
                    value={this.state.order_total}
                    onChange={(event: any) =>
                      this.setState({ order_total: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Status"
                    type="select"
                    name="select"
                    >
                      <option>Status</option>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Complete</option>
                    <option>Cancelled</option>
                    value={this.state.status}
                    onChange=
                    {(event: any) =>
                      this.setState({ status: event.target.value })
                    }</Input>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Save
            </Button>{" "}
            <Button
              color="secondary"
              onClick={(event) => this.props.toggleUpdate()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default OrderUpdate;
