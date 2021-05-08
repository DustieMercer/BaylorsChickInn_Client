import APIURL from "../../helpers/environment";
import * as React from "react";
import AddChick from "./AddChick";
import IChick from "../interfaces/IChick";
import DeleteChick from "./DeleteChick";
import UpdateChick from './UpdateChick';

import { Card, Button, CardImg } from "react-bootstrap";

export interface ChickAdminProps {
  sessionToken: string;
}

export interface ChickAdminState {
  chicks: [];
  chick_name: string;
  chick_type: string;
  chick_production: string;
  chick_persona: string;
  photo: string;
  id: number;
}

class ChickAdmin extends React.Component<ChickAdminProps, ChickAdminState> {
  constructor(props: ChickAdminProps) {
    super(props);
    this.state = {
      chicks: [],
      chick_name: "",
      chick_type: "",
      chick_production: "",
      chick_persona: "",
      photo: "",
      id: NaN,
    };
  }

  componentDidMount = () => {
    this.fetchChicks();
    console.log(this.props.sessionToken)
  };
  fetchChicks = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : '',
      }),
    })
      .then((response) => response.json())
      .then((json: []) => {
        this.setState({ chicks: json });
        console.log(this.state.chicks);
      });
  };

  render() {
    return (
      <div>
        <AddChick sessionToken={this.props.sessionToken} />

        {this.state.chicks.map(
          (
            chick: {
              chick_name: string;
              chick_type: string;
              chick_production: string;
              chick_persona: string;
              photo: string;
              id: number;
            },
            index
          ) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={chick.photo} />
                <Card.Body>
                  <Card.Title>{chick.chick_name}</Card.Title>
                  <Card.Text>{chick.chick_type}</Card.Text>
                  <Card.Text>
                    Annual Egg Production:{" "}
                    <strong>{chick.chick_production}</strong>
                  </Card.Text>
                  <Card.Text>{chick.chick_persona}</Card.Text>
                  <UpdateChick
                    sessionToken={this.props.sessionToken}
                    fetchChicks={this.fetchChicks}
                    chick_name={this.state.chick_name}
                    chick_type={this.state.chick_type}
                    chick_production={this.state.chick_production}
                    chick_persona={this.state.chick_persona}
                    photo={this.state.photo}
                    id={this.state.id}
                  />
                  <DeleteChick
                    sessionToken={this.props.sessionToken}
                    fetchChicks={this.fetchChicks}
                    id={chick.id}
                    chick_name={chick.chick_name}
                  />
                </Card.Body>
              </Card>        
            );
          }
        )}
      </div>
    );
  }
}

export default ChickAdmin;
