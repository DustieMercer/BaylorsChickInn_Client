import APIURL from "../../helpers/environment";
import * as React from "react";
import { Table } from "react-bootstrap";
import OrderUpdate from "./OrderUpdate";
import OrderCreate from "./OrderCreate";
import DeleteOrder from "./DeleteOrder";

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
      unit_type: ",",
      quantity_ordered: NaN,
      unit_cost: NaN,
      order_total: NaN,
      status: "",
      id: NaN,
    };
  }

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
        this.setState({ orders: json });
        console.log(this.state.orders);
      });
  };

  render() {
    return (
      <div>
        {this.state.orders.map(
          (
            order: {
              item_description: string;
              unit_type: string;
              quantity_ordered: number;
              unit_cost: number;
              order_total: number;
              status: string;
            },
            index
          ) => {
            return (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Description</th>
                    <th>Unit</th>
                    <th>Qty</th>
                    <th>Item Price</th>
                    <th>Order Total</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>order.item_description</td>
                    <td>order.unit_type</td>
                    <td>order.quantity_ordered</td>
                    <td>order.unit_cost</td>
                    <td>order.order_total</td>
                    <td>order.status</td>
                    <td>
                      <OrderUpdate sessionToken={this.props.sessionToken} 
                      id={this.state.id} />
                    </td>
                    <td>
                      <DeleteOrder
                        sessionToken={this.props.sessionToken}
                        id={this.state.id}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            );
          }
        )}
      </div>
    );
  }
}

export default OrderDisplay;
