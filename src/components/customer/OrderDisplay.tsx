import APIURL from "../../helpers/environment";
import * as React from "react";
import { Table, Button } from "react-bootstrap";
import OrderUpdate from "./OrderUpdate";
import OrderCreate from "./OrderCreate";
import DeleteOrder from "./DeleteOrder";
import IOrder from "../interfaces/IOrder";
import { Container } from "reactstrap";
import { alignPropType } from "react-bootstrap/esm/DropdownMenu";

export interface OrderDisplayProps {
  sessionToken: string;
}

export interface OrderDisplayState {
  orders: [];
  item_description: string;
  unit_type: string;
  quantity_ordered: number;
  unit_cost: number;
  order_total: number;
  status: string;
  id: number;
  createdAt: any;
  updatedAt: any;
  showCreateModal: boolean;
  showUpdateModal: boolean;
  showDeleteModal: boolean;
}

class OrderDisplay extends React.Component<
  OrderDisplayProps,
  OrderDisplayState
> {
  constructor(props: OrderDisplayProps) {
    super(props);
    this.state = {
      orders: [],
      item_description: "",
      unit_type: "",
      quantity_ordered: NaN,
      unit_cost: NaN,
      order_total: NaN,
      status: "",
      id: NaN,
      createdAt: "",
      updatedAt: "",
      showCreateModal: true,
      showUpdateModal: false,
      showDeleteModal: false,
    };
  }

  toggleCreate = () => {
    this.setState({ showCreateModal: !this.state.showCreateModal });
  };
  setOrderUpdate = (order: IOrder) => {
    this.setState({
      item_description: order.item_description,
      unit_type: order.unit_type,
      quantity_ordered: order.quantity_ordered,
      unit_cost: order.unit_cost,
      order_total: order.order_total,
      status: order.status,
      id: order.id,
    });
    this.toggleUpdate();
  };

  setOrderDelete = (order: IOrder) => {
    this.setState({
      item_description: order.item_description,
      unit_type: order.unit_type,
      quantity_ordered: order.quantity_ordered,
      unit_cost: order.unit_cost,
      order_total: order.order_total,
      status: order.status,
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
    this.toggleDelete();
  };

  toggleUpdate = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  };
  toggleDelete = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  componentDidMount = () => {
    this.fetchOrders();
  };
  fetchOrders = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/order/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: []) => {
        if (json !== null) {
          this.setState({ orders: json });
          this.setState({ showCreateModal: false });
        }
      });
  };

  render() {
    return (
      <div>
        <h1>ORDER HISTORY</h1>
        {this.state.orders.map(
          (
            order: {
              item_description: string;
              unit_type: string;
              quantity_ordered: number;
              unit_cost: number;
              order_total: number;
              status: string;
              id: number;
              updatedAt: any;
              createdAt: any;
            },
            index
          ) => {
            return (
              <Container>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order#</th>
                      <th>Created</th>
                      <th>Item Description</th>
                      <th>Unit</th>
                      <th>Qty</th>
                      <th>Item Price</th>
                      <th>Order Total</th>
                      <th>Status</th>
                      <th>Last Update</th>
                      <th>Update</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order.createdAt}</td>
                      <td>{order.item_description}</td>
                      <td>{order.unit_type}</td>
                      <td>{order.quantity_ordered}</td>
                      <td>{order.unit_cost}</td>
                      <td>{order.order_total}</td>
                      <td>{order.status}</td>
                      <td>{order.updatedAt}</td>
                      <td>
                        <Button
                          color="primary"
                          onClick={(event) => this.setOrderUpdate(order)}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={(event) => this.setOrderDelete(order)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Container>
            );
          }
        )}
        {this.state.showUpdateModal === true ? (
          <OrderUpdate
            sessionToken={this.props.sessionToken}
            item_description={this.state.item_description}
            unit_type={this.state.unit_type}
            quantity_ordered={this.state.quantity_ordered}
            unit_cost={this.state.unit_cost}
            order_total={this.state.order_total}
            status={this.state.status}
            id={this.state.id}
            toggleUpdate={this.toggleUpdate}
            fetchOrders={this.fetchOrders}
          />
        ) : (
          ""
        )}
        {this.state.showDeleteModal === true ? (
          <DeleteOrder
            sessionToken={this.props.sessionToken}
            id={this.state.id}
            fetchOrders={this.fetchOrders}
            toggleDelete={this.toggleDelete}
          />
        ) : (
          ""
        )}
        {this.state.showCreateModal === true ? (
          <OrderCreate
            sessionToken={this.props.sessionToken}
            toggleCreate={this.toggleCreate}
            fetchOrders={this.fetchOrders}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default OrderDisplay;
