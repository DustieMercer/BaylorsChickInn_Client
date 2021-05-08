import { Component } from "react";
import APIURL from "../../helpers/environment";
import {
  Button,
  Modal,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import IOrder from "../interfaces/IOrder";

export interface OrderCreateProps {
  sessionToken: string;
}

export interface OrderCreateState {
showModal: boolean;
order: {
item_description: string;
unit_type: string;
quantity_ordered: number;
unit_cost: number;
order_total: number;
status: string;}
}

class OrderCreate extends Component<OrderCreateProps, OrderCreateState> {
  constructor(props: OrderCreateProps) {
    super(props);
    this.state = {
      showModal: false,
      order: {
    item_description: "",
    unit_type: "",
    quantity_ordered: NaN,
    unit_cost: NaN,
    order_total: NaN,
    status: "",
      },
    };
  }
  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/order/create`, {
      method: "POST",
      body: JSON.stringify({
            item_description: this.state.order.item_description,
            unit_type: this.state.order.unit_type,
            quantity_ordered: this.state.order.quantity_ordered,
            unit_cost: this.state.order.unit_cost,
            order_total: this.state.order.order_total,
            status: this.state.order.status
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IOrder) => {
        console.log(json);
        this.toggle();
      });
  };

  render() {
    return (
      <div>

<Modal aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Place Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.toggle}>Close</Button>
      </Modal.Footer>
    </Modal>
      </div>
    );
  }
}
export default OrderCreate;
